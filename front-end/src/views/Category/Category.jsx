import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DHeaders from '../../components/Heads/DHeaders';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';
import CategoryForm from '../../components/Category/CategoryForm';
import CategoryTable from '../../components/Category/CategoryTable';
import { getCategory, selectAllCategories, deleteCat, reseter } from '../../slicer/Category';
import { Notifier } from '../../utills/InputHelpers';

const Category = () => {
  const { status, message } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const datas = useSelector(selectAllCategories);
 
  const handleDelete = (id) => {
    dispatch(deleteCat({ _id: id }));

    if (status === 'succeeded') {
      Notifier('Item deleted', 'success');
      dispatch(reseter());
    } else if (status === 'failed') {
      Notifier(message, 'error');
      dispatch(reseter());
    }
  };

  return (
    <>
      <DHeaders />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Category</h1>
        </div>
        <section className="section dashboard">
          <div className="row">
            <div className="col-lg-5 card pt-5 pb-5">
              <CategoryForm />
            </div>
            <div className="col-lg-6 card pt-5 pb-5 mx-2">
              <CategoryTable catData={datas} onDelete={handleDelete} />
            </div>
          </div>
        </section>
      </main>
      <SideBar />
      <Footer />
    </>
  );
};

export default Category;
