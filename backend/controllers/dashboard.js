import moment from 'moment';
import Order from "../models/orders.js";
import User from "../models/user.js";
import Log from "../models/logs.js";

class DashboardRepo {

    revenueStatistic = async() => {

        const revenueData = await Order.aggregate([
            // Join with the Drug collection to get the price
            {
                $lookup: {
                    from: 'drugs',
                    localField: 'drug',
                    foreignField: '_id',
                    as: 'drugDetails'
                }
            },
            // Unwind the joined Drug details
            {
                $unwind: '$drugDetails'
            },
            // Project the necessary fields
            {
                $project: {
                    _id: 0,
                    drug: 1,
                    quantity: 1,
                    status: 1,
                    createdAt: 1,
                    price: { $toDouble: '$drugDetails.price' } // Ensure price is a number
                }
            },
            // Match only approved orders
            {
                $match: {
                    status: 'approved'
                }
            },
            // Group by year and month, and calculate total revenue
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    totalRevenue: {
                        $sum: {
                            $multiply: ['$quantity', '$price']
                        }
                    }
                }
            },
            // Sort by year and month
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1
                }
            }
        ]);
        return revenueData;
    }

    async getDashBoard(req, res) {
        try {
            // get the count of the total customers
            const users = await User.countDocuments({});

            // Get the current date's start and end times
            const currentDate = moment();
            const startOfDay = currentDate.startOf('day').toDate();
            const endOfDay = currentDate.endOf('day').toDate();

            // get logs 
            const logs = await Log.find({
                timestamp: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                }
            }).populate({ path: 'user', select:'-password' })

            // Find orders made within the current day
            const todaysOrders = await Order.find({
                createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay,
                },
            }).populate('drug');

            // Get the current year and month
            // const year = currentDate.year();
            // const month = currentDate.month() + 1; 

            // Define the start and end dates for the current month
            const startOfMonth = currentDate.startOf('month');
            const endOfMonth = currentDate.endOf('month');

            // Find all orders within the current month
            const orders = await Order.find({
                createdAt: { $gte: startOfMonth, $lte: endOfMonth },
            }).populate('drug');

            // Calculate the total revenue
            let totalRevenue = 0;
            orders.forEach((order) => {
                const drugPrice = order.drug?.price ?? 0;
                totalRevenue += drugPrice * order.quantity;
            });

            // Query to find the top 5 most recent sales
            const recentTopFiveSales = await Order.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .populate('drug')
                .populate({path:'user', select:'-password'});

            // Aggregate orders by drug ID and sum the quantities
            const topSales = await Order.aggregate([
                {
                    $group: {
                        _id: "$drug", // Group by drug ID
                        totalQuantity: { $sum: "$quantity" }, // Sum the quantities
                    },
                },
                {
                    $sort: { totalQuantity: -1 }, // Sort in descending order based on total quantity sold
                },
                {
                    $lookup: {
                        from: 'drugs', // Collection to join with
                        localField: '_id', // Field from the current collection to match
                        foreignField: '_id', // Field from the joined collection to match
                        as: 'drugDetail', // Field name for the joined data
                    },
                },
                {
                    $unwind: '$drugDetail', // Flatten the joined array to a single object
                },
                {
                    $project: {
                        image: '$drugDetail.image', // Drug image
                        drugName: '$drugDetail.name', // Drug name
                        price: { $toDouble: '$drugDetail.price' }, // Ensure price is numeric
                        totalQuantity: 1, // Total quantity sold
                        revenue: { $multiply: ['$totalQuantity', { $toDouble: '$drugDetail.price' }] }, // Calculate revenue
                    },
                },
                {
                    $limit: 5, // Limit to get the top 5 best-selling drugs
                },
            ]);
            const revenueData = await Order.aggregate([
                // Join with the Drug collection to get the price
                {
                    $lookup: {
                        from: 'drugs',
                        localField: 'drug',
                        foreignField: '_id',
                        as: 'drugDetails'
                    }
                },
                // Unwind the joined Drug details
                {
                    $unwind: '$drugDetails'
                },
                // Project the necessary fields
                {
                    $project: {
                        _id: 0,
                        drug: 1,
                        quantity: 1,
                        status: 1,
                        createdAt: 1,
                        price: { $toDouble: '$drugDetails.price' } // Ensure price is a number
                    }
                },
                // Match only approved orders
                {
                    $match: {
                        status: 'approved'
                    }
                },
                // Group by year and month, and calculate total revenue
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        totalRevenue: {
                            $sum: {
                                $multiply: ['$quantity', '$price']
                            }
                        }
                    }
                },
                // Sort by year and month
                {
                    $sort: {
                        '_id.year': 1,
                        '_id.month': 1
                    }
                }
            ]);
            return res.status(200).json({ data: { topSales, users, recentTopFiveSales, todaysOrders, totalRevenue, revenueData, logs } })


        } catch (error) {
            console.error("Error fetching top selling drug:", error);
            return res.status(500).json({ error: `Error: ${error.message}` })
        }
    }



}

export default new DashboardRepo()