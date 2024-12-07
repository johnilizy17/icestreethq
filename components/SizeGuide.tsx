// components/SizeGuide.js
import { Box, Table, Thead, Tbody, Tr, Th, Td, Heading } from '@chakra-ui/react';

const SizeGuide = () => {
  const womenSizeGuide = [
    {
      mainRange: 'XS',
      uk: '4',
      eu: '6',
      usa_ca: '0',
      aus: '4',
      fr: '32',
      bust: '30.9',
      waist: '23.8',
      lowHip: '34',
    },
    {
      mainRange: 'S',
      uk: '6-8',
      eu: '8-10',
      usa_ca: '2-4',
      aus: '6-8',
      fr: '34-36',
      bust: '31.8-33.8',
      waist: '24.8-26.7',
      lowHip: '35-37',
    },
    {
      mainRange: 'M',
      uk: '10',
      eu: '10',
      usa_ca: '8',
      aus: '10',
      fr: '38',
      bust: '35.8',
      waist: '28.7',
      lowHip: '38.9',
    },
    {
      mainRange: 'L',
      uk: '16',
      eu: '16',
      usa_ca: '14',
      aus: '16',
      fr: '44',
      bust: '41.7',
      waist: '34.6',
      lowHip: '44.8',
    },
    {
      mainRange: 'XL',
      uk: '18',
      eu: '18',
      usa_ca: '14',
      aus: '18',
      fr: '46',
      bust: '44',
      waist: '37',
      lowHip: '47',
    }
    // Add remaining data here
  ];

  const menSizeGuide = [
    {
      mainRange: 'XS',
      uk: '34',
      eu: '44',
      usa_aus: '34',
      chestWidth: '34',
      waist: '28',
      sleeveLength: '9',
      insideLeg: '27.5',
    },
    {
      mainRange: 'S',
      uk: '36',
      eu: '46',
      usa_aus: '36',
      chestWidth: '36',
      waist: '30',
      sleeveLength: '9.5',
      insideLeg: '28',
    },
    {
      mainRange: 'M',
      uk: '48',
      eu: '38',
      usa_aus: '38',
      chestWidth: '32',
      waist: '10',
      sleeveLength: '28.5',
      insideLeg: '28.5',
    },
    {
      mainRange: 'L',
      uk: '50',
      eu: '50',
      usa_aus: '40',
      chestWidth: '40',
      waist: '34',
      sleeveLength: '10.5',
      insideLeg: '28.5',
    },
    
    {
      mainRange: 'XL',
      uk: '52',
      eu: '52',
      usa_aus: '42',
      chestWidth: '42',
      waist: '36',
      sleeveLength: '11',
      insideLeg: '29',
    },
    
    {
      mainRange: 'XXL',
      uk: '54',
      eu: '54',
      usa_aus: '44',
      chestWidth: '44',
      waist: '38',
      sleeveLength: '11.5',
      insideLeg: '29.5',
    },
    
    {
      mainRange: 'XXXL',
      uk: '56',
      eu: '56',
      usa_aus: '46',
      chestWidth: '46',
      waist: '40',
      sleeveLength: '12',
      insideLeg: '29.75',
    },
    // Add remaining data here
  ];

  return (
    <Box padding="4">
      <Heading size="lg" marginBottom="4">Women Clothing Size Guide</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Main Range</Th>
            <Th>UK</Th>
            <Th>EU</Th>
            <Th>USA/CA</Th>
            <Th>AUS</Th>
            <Th>FR</Th>
            <Th>Bust</Th>
            <Th>Waist</Th>
            <Th>Low Hip</Th>
          </Tr>
        </Thead>
        <Tbody>
          {womenSizeGuide.map((row, index) => (
            <Tr key={index}>
              <Td>{row.mainRange}</Td>
              <Td>{row.uk}</Td>
              <Td>{row.eu}</Td>
              <Td>{row.usa_ca}</Td>
              <Td>{row.aus}</Td>
              <Td>{row.fr}</Td>
              <Td>{row.bust}</Td>
              <Td>{row.waist}</Td>
              <Td>{row.lowHip}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Heading size="lg" marginY="6">Men Clothing Size Guide</Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Main Range</Th>
            <Th>UK</Th>
            <Th>EU</Th>
            <Th>USA/AUS</Th>
            <Th>Chest Width</Th>
            <Th>Waist</Th>
            <Th>Sleeve Length</Th>
            <Th>Inside Leg</Th>
          </Tr>
        </Thead>
        <Tbody>
          {menSizeGuide.map((row, index) => (
            <Tr key={index}>
              <Td>{row.mainRange}</Td>
              <Td>{row.uk}</Td>
              <Td>{row.eu}</Td>
              <Td>{row.usa_aus}</Td>
              <Td>{row.chestWidth}</Td>
              <Td>{row.waist}</Td>
              <Td>{row.sleeveLength}</Td>
              <Td>{row.insideLeg}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SizeGuide;
