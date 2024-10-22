import React from 'react'
import MenuLayout from '../../components/MenuLayout'
import SingleItem from '../../components/homepagecomponents/SingleItem'
import { getCategories } from '../../services';
import toast from 'react-hot-toast';

export default function Index() {

  const [category, setCategory] = React.useState({} as any)
  // const product_id = localStorage.getItem("product_id")
  const [product_id, setProductId] = React.useState({} as any);

  React.useEffect(() => {

    setProductId(localStorage.getItem("product_id"));
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await getCategories();
        response?.map((item: any) => {
          if (item.title === product_id) {
            setCategory(item);
          }
        })
      } catch (err) {
        toast.error("Error occured");
      }
    })();
  }, [product_id]);

  return (
    <MenuLayout menu={false} category={true} >
      <div className=' w-full mt-4 lg:mt-12 ' >
        <SingleItem title='Groceries' category={category} label={true} />
      </div>
    </MenuLayout>
  )
} 