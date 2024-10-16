import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../DashboardLayout'
import { Box, Image, Input, Select, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UserAddress } from '../../../services/userDashboardServices'

type props = {
    add: Function,
    data: any,
    edit: any,
    getAddress: Function
}

export default function AddDeliveryAddress({ add, data, edit, getAddress }: props) {

    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const { addUserAddress } = UserAddress()
    const [user, setUser] = useState("")
    const [localgoverment, setLocalgoverment] = useState("Abia")
    const addressSchema = yup.object({
        address: yup.string().required('Your address is required'),
    })


    const formik = useFormik({
        initialValues: { address: '', user_id: user, phone: "", state: "", lga: "" },
        validationSchema: addressSchema,
        onSubmit: () => { },
    });


    const submit = async () => {
        setLoading(true)
        if (!formik.dirty) {
            // toast.error("Please Enter Your Email And Password") 
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else if (!formik.isValid) {
            toast({
                title: "You have to fill in the form to continue",
                position: "bottom",
                status: "error",
                isClosable: true,
            })
        } else {

            const response = await addUserAddress(JSON.stringify(formik.values))

            if (response?.status === 200) {

                toast({
                    title: response?.data?.msg ? response?.data?.msg : "successfully submit",
                    position: "bottom",
                    status: "success",
                    isClosable: true,
                })
                add(false)
                getAddress()
            } else {
                toast({
                    title: response?.data?.msg ? response?.data?.msg : "Error occured",
                    position: "bottom",
                    status: "error",
                    isClosable: true,
                })
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        setUser(localStorage.getItem("user") ?? "")
        if (edit) {
            console.log(edit.address)
            formik.setFieldValue("address", edit.address)
        }
    }, [])

    const stateData = [
        {
            "state": "Adamawa",
            "alias": "adamawa",
            "lgas": [
                "Demsa",
                "Fufure",
                "Ganye",
                "Gayuk",
                "Gombi",
                "Grie",
                "Hong",
                "Jada",
                "Larmurde",
                "Madagali",
                "Maiha",
                "Mayo Belwa",
                "Michika",
                "Mubi North",
                "Mubi South",
                "Numan",
                "Shelleng",
                "Song",
                "Toungo",
                "Yola North",
                "Yola South"
            ]
        },
        {
            "state": "Akwa Ibom",
            "alias": "akwa_ibom",
            "lgas": [
                "Abak",
                "Eastern Obolo",
                "Eket",
                "Esit Eket",
                "Essien Udim",
                "Etim Ekpo",
                "Etinan",
                "Ibeno",
                "Ibesikpo Asutan",
                "Ibiono-Ibom",
                "Ikot Abasi",
                "Ika",
                "Ikono",
                "Ikot Ekpene",
                "Ini",
                "Mkpat-Enin",
                "Itu",
                "Mbo",
                "Nsit-Atai",
                "Nsit-Ibom",
                "Nsit-Ubium",
                "Obot Akara",
                "Okobo",
                "Onna",
                "Oron",
                "Udung-Uko",
                "Ukanafun",
                "Oruk Anam",
                "Uruan",
                "Urue-Offong/Oruko",
                "Uyo"
            ]
        },
        {
            "state": "Anambra",
            "alias": "anambra",
            "lgas": [
                "Aguata",
                "Anambra East",
                "Anaocha",
                "Awka North",
                "Anambra West",
                "Awka South",
                "Ayamelum",
                "Dunukofia",
                "Ekwusigo",
                "Idemili North",
                "Idemili South",
                "Ihiala",
                "Njikoka",
                "Nnewi North",
                "Nnewi South",
                "Ogbaru",
                "Onitsha North",
                "Onitsha South",
                "Orumba North",
                "Orumba South",
                "Oyi"
            ]
        },
        {
            "state": "Ogun",
            "alias": "ogun",
            "lgas": [
                "Abeokuta North",
                "Abeokuta South",
                "Ado-Odo/Ota",
                "Egbado North",
                "Ewekoro",
                "Egbado South",
                "Ijebu North",
                "Ijebu East",
                "Ifo",
                "Ijebu Ode",
                "Ijebu North East",
                "Imeko Afon",
                "Ikenne",
                "Ipokia",
                "Odeda",
                "Obafemi Owode",
                "Odogbolu",
                "Remo North",
                "Ogun Waterside",
                "Shagamu"
            ]
        },
        {
            "state": "Ondo",
            "alias": "ondo",
            "lgas": [
                "Akoko North-East",
                "Akoko North-West",
                "Akoko South-West",
                "Akoko South-East",
                "Akure North",
                "Akure South",
                "Ese Odo",
                "Idanre",
                "Ifedore",
                "Ilaje",
                "Irele",
                "Ile Oluji/Okeigbo",
                "Odigbo",
                "Okitipupa",
                "Ondo West",
                "Ose",
                "Ondo East",
                "Owo"
            ]
        },
        {
            "state": "Rivers",
            "alias": "rivers",
            "lgas": [
                "Abua/Odual",
                "Ahoada East",
                "Ahoada West",
                "Andoni",
                "Akuku-Toru",
                "Asari-Toru",
                "Bonny",
                "Degema",
                "Emuoha",
                "Eleme",
                "Ikwerre",
                "Etche",
                "Gokana",
                "Khana",
                "Obio/Akpor",
                "Ogba/Egbema/Ndoni",
                "Ogu/Bolo",
                "Okrika",
                "Omuma",
                "Opobo/Nkoro",
                "Oyigbo",
                "Port Harcourt",
                "Tai"
            ]
        },
        {
            "state": "Bauchi",
            "alias": "bauchi",
            "lgas": [
                "Alkaleri",
                "Bauchi",
                "Bogoro",
                "Damban",
                "Darazo",
                "Dass",
                "Gamawa",
                "Ganjuwa",
                "Giade",
                "Itas/Gadau",
                "Jama'are",
                "Katagum",
                "Kirfi",
                "Misau",
                "Ningi",
                "Shira",
                "Tafawa Balewa",
                "Toro",
                "Warji",
                "Zaki"
            ]
        },
        {
            "state": "Benue",
            "alias": "benue",
            "lgas": [
                "Agatu",
                "Apa",
                "Ado",
                "Buruku",
                "Gboko",
                "Guma",
                "Gwer East",
                "Gwer West",
                "Katsina-Ala",
                "Konshisha",
                "Kwande",
                "Logo",
                "Makurdi",
                "Obi",
                "Ogbadibo",
                "Ohimini",
                "Oju",
                "Okpokwu",
                "Oturkpo",
                "Tarka",
                "Ukum",
                "Ushongo",
                "Vandeikya"
            ]
        },
        {
            "state": "Borno",
            "alias": "borno",
            "lgas": [
                "Abadam",
                "Askira/Uba",
                "Bama",
                "Bayo",
                "Biu",
                "Chibok",
                "Damboa",
                "Dikwa",
                "Guzamala",
                "Gubio",
                "Hawul",
                "Gwoza",
                "Jere",
                "Kaga",
                "Kala/Balge",
                "Konduga",
                "Kukawa",
                "Kwaya Kusar",
                "Mafa",
                "Magumeri",
                "Maiduguri",
                "Mobbar",
                "Marte",
                "Monguno",
                "Ngala",
                "Nganzai",
                "Shani"
            ]
        },
        {
            "state": "Bayelsa",
            "alias": "bayelsa",
            "lgas": [
                "Brass",
                "Ekeremor",
                "Kolokuma/Opokuma",
                "Nembe",
                "Ogbia",
                "Sagbama",
                "Southern Ijaw",
                "Yenagoa"
            ]
        },
        {
            "state": "Cross River",
            "alias": "cross_river",
            "lgas": [
                "Abi",
                "Akamkpa",
                "Akpabuyo",
                "Bakassi",
                "Bekwarra",
                "Biase",
                "Boki",
                "Calabar Municipal",
                "Calabar South",
                "Etung",
                "Ikom",
                "Obanliku",
                "Obubra",
                "Obudu",
                "Odukpani",
                "Ogoja",
                "Yakuur",
                "Yala"
            ]
        },
        {
            "state": "Delta",
            "alias": "delta",
            "lgas": [
                "Aniocha North",
                "Aniocha South",
                "Bomadi",
                "Burutu",
                "Ethiope West",
                "Ethiope East",
                "Ika North East",
                "Ika South",
                "Isoko North",
                "Isoko South",
                "Ndokwa East",
                "Ndokwa West",
                "Okpe",
                "Oshimili North",
                "Oshimili South",
                "Patani",
                "Sapele",
                "Udu",
                "Ughelli North",
                "Ukwuani",
                "Ughelli South",
                "Uvwie",
                "Warri North",
                "Warri South",
                "Warri South West"
            ]
        },
        {
            "state": "Ebonyi",
            "alias": "ebonyi",
            "lgas": [
                "Abakaliki",
                "Afikpo North",
                "Ebonyi",
                "Afikpo South",
                "Ezza North",
                "Ikwo",
                "Ezza South",
                "Ivo",
                "Ishielu",
                "Izzi",
                "Ohaozara",
                "Ohaukwu",
                "Onicha"
            ]
        },
        {
            "state": "Edo",
            "alias": "edo",
            "lgas": [
                "Akoko-Edo",
                "Egor",
                "Esan Central",
                "Esan North-East",
                "Esan South-East",
                "Esan West",
                "Etsako Central",
                "Etsako East",
                "Etsako West",
                "Igueben",
                "Ikpoba Okha",
                "Orhionmwon",
                "Oredo",
                "Ovia North-East",
                "Ovia South-West",
                "Owan East",
                "Owan West",
                "Uhunmwonde"
            ]
        },
        {
            "state": "Ekiti",
            "alias": "ekiti",
            "lgas": [
                "Ado Ekiti",
                "Efon",
                "Ekiti East",
                "Ekiti South-West",
                "Ekiti West",
                "Emure",
                "Gbonyin",
                "Ido Osi",
                "Ijero",
                "Ikere",
                "Ilejemeje",
                "Irepodun/Ifelodun",
                "Ikole",
                "Ise/Orun",
                "Moba",
                "Oye"
            ]
        },
        {
            "state": "Enugu",
            "alias": "enugu",
            "lgas": [
                "Awgu",
                "Aninri",
                "Enugu East",
                "Enugu North",
                "Ezeagu",
                "Enugu South",
                "Igbo Etiti",
                "Igbo Eze North",
                "Igbo Eze South",
                "Isi Uzo",
                "Nkanu East",
                "Nkanu West",
                "Nsukka",
                "Udenu",
                "Oji River",
                "Uzo Uwani",
                "Udi"
            ]
        },
        {
            "state": "Federal Capital Territory",
            "alias": "abuja",
            "lgas": [
                "Abaji",
                "Bwari",
                "Gwagwalada",
                "Kuje",
                "Kwali",
                "Municipal Area Council"
            ]
        },
        {
            "state": "Gombe",
            "alias": "gombe",
            "lgas": [
                "Akko",
                "Balanga",
                "Billiri",
                "Dukku",
                "Funakaye",
                "Gombe",
                "Kaltungo",
                "Kwami",
                "Nafada",
                "Shongom",
                "Yamaltu/Deba"
            ]
        },
        {
            "state": "Jigawa",
            "alias": "jigawa",
            "lgas": [
                "Auyo",
                "Babura",
                "Buji",
                "Biriniwa",
                "Birnin Kudu",
                "Dutse",
                "Gagarawa",
                "Garki",
                "Gumel",
                "Guri",
                "Gwaram",
                "Gwiwa",
                "Hadejia",
                "Jahun",
                "Kafin Hausa",
                "Kazaure",
                "Kiri Kasama",
                "Kiyawa",
                "Kaugama",
                "Maigatari",
                "Malam Madori",
                "Miga",
                "Sule Tankarkar",
                "Roni",
                "Ringim",
                "Yankwashi",
                "Taura"
            ]
        },
        {
            "state": "Oyo",
            "alias": "oyo",
            "lgas": [
                "Afijio",
                "Akinyele",
                "Atiba",
                "Atisbo",
                "Egbeda",
                "Ibadan North",
                "Ibadan North-East",
                "Ibadan North-West",
                "Ibadan South-East",
                "Ibarapa Central",
                "Ibadan South-West",
                "Ibarapa East",
                "Ido",
                "Ibarapa North",
                "Irepo",
                "Iseyin",
                "Itesiwaju",
                "Iwajowa",
                "Kajola",
                "Lagelu",
                "Ogbomosho North",
                "Ogbomosho South",
                "Ogo Oluwa",
                "Olorunsogo",
                "Oluyole",
                "Ona Ara",
                "Orelope",
                "Ori Ire",
                "Oyo",
                "Oyo East",
                "Saki East",
                "Saki West",
                "Surulere Oyo State"
            ]
        },
        {
            "state": "Imo",
            "alias": "imo",
            "lgas": [
                "Aboh Mbaise",
                "Ahiazu Mbaise",
                "Ehime Mbano",
                "Ezinihitte",
                "Ideato North",
                "Ideato South",
                "Ihitte/Uboma",
                "Ikeduru",
                "Isiala Mbano",
                "Mbaitoli",
                "Isu",
                "Ngor Okpala",
                "Njaba",
                "Nkwerre",
                "Nwangele",
                "Obowo",
                "Oguta",
                "Ohaji/Egbema",
                "Okigwe",
                "Orlu",
                "Orsu",
                "Oru East",
                "Oru West",
                "Owerri Municipal",
                "Owerri North",
                "Unuimo",
                "Owerri West"
            ]
        },
        {
            "state": "Kaduna",
            "alias": "kaduna",
            "lgas": [
                "Birnin Gwari",
                "Chikun",
                "Giwa",
                "Ikara",
                "Igabi",
                "Jaba",
                "Jema'a",
                "Kachia",
                "Kaduna North",
                "Kaduna South",
                "Kagarko",
                "Kajuru",
                "Kaura",
                "Kauru",
                "Kubau",
                "Kudan",
                "Lere",
                "Makarfi",
                "Sabon Gari",
                "Sanga",
                "Soba",
                "Zangon Kataf",
                "Zaria"
            ]
        },
        {
            "state": "Kebbi",
            "alias": "kebbi",
            "lgas": [
                "Aleiro",
                "Argungu",
                "Arewa Dandi",
                "Augie",
                "Bagudo",
                "Birnin Kebbi",
                "Bunza",
                "Dandi",
                "Fakai",
                "Gwandu",
                "Jega",
                "Kalgo",
                "Koko/Besse",
                "Maiyama",
                "Ngaski",
                "Shanga",
                "Suru",
                "Sakaba",
                "Wasagu/Danko",
                "Yauri",
                "Zuru"
            ]
        },
        {
            "state": "Kano",
            "alias": "kano",
            "lgas": [
                "Ajingi",
                "Albasu",
                "Bagwai",
                "Bebeji",
                "Bichi",
                "Bunkure",
                "Dala",
                "Dambatta",
                "Dawakin Kudu",
                "Dawakin Tofa",
                "Doguwa",
                "Fagge",
                "Gabasawa",
                "Garko",
                "Garun Mallam",
                "Gezawa",
                "Gaya",
                "Gwale",
                "Gwarzo",
                "Kabo",
                "Kano Municipal",
                "Karaye",
                "Kibiya",
                "Kiru",
                "Kumbotso",
                "Kunchi",
                "Kura",
                "Madobi",
                "Makoda",
                "Minjibir",
                "Nasarawa",
                "Rano",
                "Rimin Gado",
                "Rogo",
                "Shanono",
                "Takai",
                "Sumaila",
                "Tarauni",
                "Tofa",
                "Tsanyawa",
                "Tudun Wada",
                "Ungogo",
                "Warawa",
                "Wudil"
            ]
        },
        {
            "state": "Kogi",
            "alias": "kogi",
            "lgas": [
                "Ajaokuta",
                "Adavi",
                "Ankpa",
                "Bassa",
                "Dekina",
                "Ibaji",
                "Idah",
                "Igalamela Odolu",
                "Ijumu",
                "Kogi",
                "Kabba/Bunu",
                "Lokoja",
                "Ofu",
                "Mopa Muro",
                "Ogori/Magongo",
                "Okehi",
                "Okene",
                "Olamaboro",
                "Omala",
                "Yagba East",
                "Yagba West"
            ]
        },
        {
            "state": "Osun",
            "alias": "osun",
            "lgas": [
                "Aiyedire",
                "Atakunmosa West",
                "Atakunmosa East",
                "Aiyedaade",
                "Boluwaduro",
                "Boripe",
                "Ife East",
                "Ede South",
                "Ife North",
                "Ede North",
                "Ife South",
                "Ejigbo",
                "Ife Central",
                "Ifedayo",
                "Egbedore",
                "Ila",
                "Ifelodun",
                "Ilesa East",
                "Ilesa West",
                "Irepodun",
                "Irewole",
                "Isokan",
                "Iwo",
                "Obokun",
                "Odo Otin",
                "Ola Oluwa",
                "Olorunda",
                "Oriade",
                "Orolu",
                "Osogbo"
            ]
        },
        {
            "state": "Sokoto",
            "alias": "sokoto",
            "lgas": [
                "Gudu",
                "Gwadabawa",
                "Illela",
                "Isa",
                "Kebbe",
                "Kware",
                "Rabah",
                "Sabon Birni",
                "Shagari",
                "Silame",
                "Sokoto North",
                "Sokoto South",
                "Tambuwal",
                "Tangaza",
                "Tureta",
                "Wamako",
                "Wurno",
                "Yabo",
                "Binji",
                "Bodinga",
                "Dange Shuni",
                "Goronyo",
                "Gada"
            ]
        },
        {
            "state": "Plateau",
            "alias": "plateau",
            "lgas": [
                "Bokkos",
                "Barkin Ladi",
                "Bassa",
                "Jos East",
                "Jos North",
                "Jos South",
                "Kanam",
                "Kanke",
                "Langtang South",
                "Langtang North",
                "Mangu",
                "Mikang",
                "Pankshin",
                "Qua'an Pan",
                "Riyom",
                "Shendam",
                "Wase"
            ]
        },
        {
            "state": "Taraba",
            "alias": "taraba",
            "lgas": [
                "Ardo Kola",
                "Bali",
                "Donga",
                "Gashaka",
                "Gassol",
                "Ibi",
                "Jalingo",
                "Karim Lamido",
                "Kumi",
                "Lau",
                "Sardauna",
                "Takum",
                "Ussa",
                "Wukari",
                "Yorro",
                "Zing"
            ]
        },
        {
            "state": "Yobe",
            "alias": "yobe",
            "lgas": [
                "Bade",
                "Bursari",
                "Damaturu",
                "Fika",
                "Fune",
                "Geidam",
                "Gujba",
                "Gulani",
                "Jakusko",
                "Karasuwa",
                "Machina",
                "Nangere",
                "Nguru",
                "Potiskum",
                "Tarmuwa",
                "Yunusari",
                "Yusufari"
            ]
        },
        {
            "state": "Zamfara",
            "alias": "zamfara",
            "lgas": [
                "Anka",
                "Birnin Magaji/Kiyaw",
                "Bakura",
                "Bukkuyum",
                "Bungudu",
                "Gummi",
                "Gusau",
                "Kaura Namoda",
                "Maradun",
                "Shinkafi",
                "Maru",
                "Talata Mafara",
                "Tsafe",
                "Zurmi"
            ]
        },
        {
            "state": "Lagos",
            "alias": "lagos",
            "lgas": [
                "Agege",
                "Ajeromi-Ifelodun",
                "Alimosho",
                "Amuwo-Odofin",
                "Badagry",
                "Apapa",
                "Epe",
                "Eti Osa",
                "Ibeju-Lekki",
                "Ifako-Ijaiye",
                "Ikeja",
                "Ikorodu",
                "Kosofe",
                "Lagos Island",
                "Mushin",
                "Lagos Mainland",
                "Ojo",
                "Oshodi-Isolo",
                "Shomolu",
                "Surulere Lagos State"
            ]
        },
        {
            "state": "Katsina",
            "alias": "katsina",
            "lgas": [
                "Bakori",
                "Batagarawa",
                "Batsari",
                "Baure",
                "Bindawa",
                "Charanchi",
                "Danja",
                "Dandume",
                "Dan Musa",
                "Daura",
                "Dutsi",
                "Dutsin Ma",
                "Faskari",
                "Funtua",
                "Ingawa",
                "Jibia",
                "Kafur",
                "Kaita",
                "Kankara",
                "Kankia",
                "Katsina",
                "Kurfi",
                "Kusada",
                "Mai'Adua",
                "Malumfashi",
                "Mani",
                "Mashi",
                "Matazu",
                "Musawa",
                "Rimi",
                "Sabuwa",
                "Safana",
                "Sandamu",
                "Zango"
            ]
        },
        {
            "state": "Kwara",
            "alias": "kwara",
            "lgas": [
                "Asa",
                "Baruten",
                "Edu",
                "Ilorin East",
                "Ifelodun",
                "Ilorin South",
                "Ekiti Kwara State",
                "Ilorin West",
                "Irepodun",
                "Isin",
                "Kaiama",
                "Moro",
                "Offa",
                "Oke Ero",
                "Oyun",
                "Pategi"
            ]
        },
        {
            "state": "Nasarawa",
            "alias": "nasarawa",
            "lgas": [
                "Akwanga",
                "Awe",
                "Doma",
                "Karu",
                "Keana",
                "Keffi",
                "Lafia",
                "Kokona",
                "Nasarawa Egon",
                "Nasarawa",
                "Obi",
                "Toto",
                "Wamba"
            ]
        },
        {
            "state": "Niger",
            "alias": "niger",
            "lgas": [
                "Agaie",
                "Agwara",
                "Bida",
                "Borgu",
                "Bosso",
                "Chanchaga",
                "Edati",
                "Gbako",
                "Gurara",
                "Katcha",
                "Kontagora",
                "Lapai",
                "Lavun",
                "Mariga",
                "Magama",
                "Mokwa",
                "Mashegu",
                "Moya",
                "Paikoro",
                "Rafi",
                "Rijau",
                "Shiroro",
                "Suleja",
                "Tafa",
                "Wushishi"
            ]
        },
        {
            "state": "Abia",
            "alias": "abia",
            "lgas": [
                "Aba North",
                "Arochukwu",
                "Aba South",
                "Bende",
                "Isiala Ngwa North",
                "Ikwuano",
                "Isiala Ngwa South",
                "Isuikwuato",
                "Obi Ngwa",
                "Ohafia",
                "Osisioma",
                "Ugwunagbo",
                "Ukwa East",
                "Ukwa West",
                "Umuahia North",
                "Umuahia South",
                "Umu Nneochi"
            ]
        }
    ]

    const [localData, setLocalData] = useState([])

    useEffect(() => {

        stateData.filter((item: any) => {
            if (item.state.includes(localgoverment)) {
                console.log(item)
                return item
            }
        }).map((st: any, _st: number) => {
            return setLocalData(st.lgas)
        })



    }, [localgoverment])

    return (
        <div className=' w-full rounded-[10px] bg-white ' >
            <div className=' w-full border-b flex items-center border-[#D9D9D9] pb-[17px]  lg:py-[17px] lg:px-[46px] ' >
                <Image onClick={() => {
                    add(false)
                    getAddress()
                }} src='/images/icon/backarrow.svg' className=' cursor-pointer ' alt='Arrow' width="16px" />
                <p className=' font-bold text-lg ml-6 ' >Delivery Address</p>
            </div>
            <div className=' w-full lg:px-[46px] lg:py-[27px] pb-[50px] ' >
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >Street Address</p>
                    <Input
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        onFocus={() =>
                            formik.setFieldTouched("address", true, true)
                        }
                        height="45px" border="1px solid #595959E5" placeholder='Enter Delivery Address' fontSize="sm" />
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >Phone Number</p>
                    <Input
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onFocus={() =>
                            formik.setFieldTouched("phone", true, true)
                        }
                        height="45px" border="1px solid #595959E5" placeholder='Enter Phone Number' fontSize="sm" />
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >State</p>
                    <Select name="state"
                        onChange={(e: any) => {
                            const value = e.target.value
                            formik.setFieldValue("state", value)
                            setLocalgoverment(value)
                        }}
                        height="45px" border="1px solid #595959E5" placeholder='Enter City' fontSize="sm">
                        {
                            stateData.map((st: any, _st: number) => (
                                <option key={_st} value={st.state}>

                                    {st.state}
                                </option>
                            ))}
                    </Select>
                </div>
                <div className=' w-full mt-4 ' >
                    <p className=' text-sm mb-2 ' >LGA (Local Govt. Area)</p>
                    <Select
                        name="lga"
                        onChange={(e: any) => {
                            const value = e.target.value
                            formik.setFieldValue("lga", value)
                            setLocalgoverment(value)
                        }}
                        height="45px" border="1px solid #595959E5" placeholder='Enter City' fontSize="sm" >
                        {

                            localData.map((lg: any, _lg: number) => (
                                <option key={_lg} value="option1">{lg}</option>)

                            )
                        }

                    </Select>
                </div>
                <button disabled={loading} onClick={() => submit()} className=' w-full h-[45px] rounded-[2px] text-white bg-[#069046] font-Inter-ExtraBold text-sm mt-6 '>
                    {!loading ? "Continue" : "Loading"}
                </button>
            </div>
        </div>
    )
} 