import {
  ChatBubbleBottomCenterIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import Layout from "@components/layouts/Layout";
// import { WhatsappIcon } from "components/Svgs";
import { User } from "firebase/auth";
import { NextPage } from "next";
//import Link from "next/link";
import Link from "next/link";
import { Grid, GridItem } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Box,
Text,
Divider,
InputGroup,
InputLeftElement,
Stack,
Button,
HStack,
InputRightElement,
Input,
} from '@chakra-ui/react'

const Article = () => {
  return (
    <Layout>
      <>
        <Box w={["full", "65%", "40%", "35%"]} mx='auto' px='2'>
          <Heading mx='auto' size='md' pt={["10", "10", "unset"]}>
            // here we can have the specific title of the question?
          </Heading>
          <InputGroup
            w={["100%", "100%", "100%"]}
            mt={["5", "5", "3"]}
            zIndex='0'
            boxShadow='sm'>
            <InputLeftElement h='full' ml='1'>
              <MagnifyingGlassIcon width={25} />
            </InputLeftElement>

            <InputRightElement
              display={["none", "none", "flex"]}
              w='auto'
              alignSelf='center'
            />
            <Input
              size='sm'
              variant='filled'
              type='text'
              borderRadius='15'
              placeholder='type your question'
              bgColor='white'
              rounded='lg'
              _placeholder={{ color: "gray", pl: "2", fontSize: "17" }}
            />
          </InputGroup>
        </Box>

        <Grid
          columnGap={2}
          rowGap={3}
          gridTemplateColumns='repeat(8,1fr)'
          w='full'
          p='2'>
          <GridBox 
            title = 'Shipment and delivery'
            link1 = 'How can I cancel an order?'
            link2 = 'Supported shipping methods'
            link3 = 'Login across multiple accounts'
          />

          <GridBox
            title = 'Ordering and Payment'
            link1 = 'How can I expedite an order?'
            link2 = 'Supported payment methods'
            link3 = 'How can I customize my order?'
          />

          <GridBox
            title = 'Account Settings'
            link1 = 'How do I change my email address'
            link2 = 'I forgot my password, how do I reset it?'
            link3 = 'How can I open a new account?'
          />

          <GridBox
            title = 'Frequently Asked Questions (FAQs)'
            link1 = 'Can I get a refund?'
            link2 = 'How can  I return the product?'
            link3 = 'How can I track my order?'
          />


            <Stack p={2}>
              <Button variant='solid' px={7} mx='auto'>
                More
              </Button>
            </Stack>
        </Grid>

        <Box p={4}>
          <Stack w='fit-content' mx='auto'>
            <Heading size='xs' mx='auto'>
              Still Need Help?
            </Heading>
            <HStack>
              <ALink
                aria-label=''
                href='mailto:cloudmall@gmail.com'
                bgColor='black'
                borderRadius='full'
                p='1.5'
                boxShadow='xl'>
                <EnvelopeIcon color='white' width='20' />
              </ALink>
              <Button
                as={ALink}
                leftIcon={<WhatsappIcon color='green' boxSize={8} />}
                variant='solid'
                py='5'
                rounded='2xl'
                href='http://wa.me/2349159114491'
                boxShadow='lg'>
                Whatsapp
              </Button>

              <ALink
                aria-label='phone'
                href='tel:09159114491'
                // bgColor='#202020'
                bgColor='black'
                rounded='2xl'
                p={1.5}
                boxShadow='lg'
                color='white'>
                <PhoneIcon width={20} />
              </ALink>
              {/* <ALink
              aria-label='chat-whatsapp'
              color='white'
              dropShadow='lg'
              href='http://wa.me/2349159114491'>
              <WhatsappIcon boxSize={8} />
            </ALink> */}
            </HStack>
          </Stack>
        </Box>
      </>
    </Layout>
  );
};

export default Article;
