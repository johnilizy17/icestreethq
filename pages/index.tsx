import Head from 'next/head'
import SingleItem from '../components/homepagecomponents/SingleItem'
import HeroSection from '../components/homepagecomponents/HeroSection'
import Packages from '../components/homepagecomponents/Packages'
import Electronic from '../components/homepagecomponents/Electronics/Index'
import MenuLayout from '../components/MenuLayout'
import React, { useEffect } from 'react'
import { getLive } from '../services'
import toast from "react-hot-toast";
import HeroSearch from '../components/homepagecomponents/HeroSection/Search'
import Subscription from '../components/homepagecomponents/Subscription'
import AllCollection from '../components/AllCollection'
import { Box, Center } from '@chakra-ui/react'
import { COLORS } from '../services/theme/colors'

export default function Home() {

  const [category, setCategory] = React.useState([] as any)


  useEffect(() => {
    (async () => {
      try {
        const response = await getLive();
        setCategory(response);
      } catch (err) {
        toast.error("Error occured");
      }
    })();
  }, []);


  return (
    <>
      <main>
        <Center fontWeight="bold" w="full" h={["70px", "50px"]} pos="fixed" zIndex={1000} top="0px" background={COLORS.black} color={COLORS.white}>
          <Box textAlign={"center"}>
            Welcome to Ice Street Official Store. Enjoy up to 50% Discount Season sales →
          </Box>
        </Center>
        <MenuLayout home={true} pageName='Ice Street' menu={false} category={false}>
          <div className=' w-full mt-[10px] lg:mt-[32px] ' >
            <HeroSection />
            {/* <HeroSearch /> */}
            {category?.map((item: any, index: number) => {
              return (
                <div key={index} className=' w-full ' >
                  {/* {item.title === "kids & Babies" &&
                  } */}
                  {item.category_id.style === 1 ?
                    <Electronic label={false} type={item.category_id} category={item?.category_id._id} createdBy={item.category_id._id} product={item.product_id} />
                    :
                    <SingleItem label={false} type={item.category_id} category={item?.category_id._id} createdBy={item.category_id._id} product={item.product_id} />
                  }
                </div>

              )
            })}

            <AllCollection label={false} />
          </div>
          <Subscription />
        </MenuLayout>
      </main>
    </>
  )
}
