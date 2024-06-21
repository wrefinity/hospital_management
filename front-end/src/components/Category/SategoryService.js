

//sort catgories
export const categorySort = (categories) => {

    const categoriesOption = !categories
        ? ""
        : Array.from(categories)
            .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            })
            .map((category) => {
                return (

                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                );
            });
    return categoriesOption
}
