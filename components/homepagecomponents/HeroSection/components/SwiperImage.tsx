import { Image } from "@chakra-ui/react"

interface Props {
    imageUrl: string,
    className?: string
    alt?: string
}

const SwiperImage = ({ imageUrl }: Props) => {
    return (
        <figure className='w-full'>
            <Image alt="Heroimage" src={imageUrl} className=' w-full h-[150px] lg:h-[390px] lg:mr-0 mr-1 object-cover rounded-[10px]' />
        </figure>
    )
}

export default SwiperImage