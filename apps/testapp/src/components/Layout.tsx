import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Box,
    Button,
    Container,
    Flex,
    Heading,
} from '@chakra-ui/react';

type LayoutProps = {
    children: React.ReactNode;
};

export const WIDTH_2XL = '1536px';

export function Layout({ children }: LayoutProps) {
    const handleClockDocs = () => {
        window.open('https://dpdocs.org/getting-coins-for-tokens-cli-wallet.html', '_blank');
    };

    return (
        <Box minH="100vh" minW="500px" bg="blackAlpha.100">
            <Alert status='info'>
                <AlertIcon />
                <AlertTitle>Do not paste any message other than the following example format: </AlertTitle>
                <AlertDescription>MY ETH ADDRESS IS 0xAa044ccF6BAD46F0de9fb4dF6b7d9fF02D2e195f. I AGREE THAT MY CORRESPONDING QUANTUM ADDRESS FOR GETTING COINS FOR MY DOGEP TOKENS IS 0xa553b8935988e6260b6e3c3ff5b340ee478b504b7166b4881365a9153c80a78c.</AlertDescription>
            </Alert>

            <Box as="header" shadow="lg" py={6} bg="blackAlpha.900" color="whiteAlpha.900">
                <Container maxW={WIDTH_2XL}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading>Doge Protocol</Heading>
                        <Flex justifyContent="space-between" alignItems="center" gap={4}>
                            <Button onClick={handleClockDocs}>Help</Button>
                        </Flex>
                    </Flex>
                </Container>
            </Box>
            <Flex flex={1} as="main" mt={6}>
                {children}
            </Flex>
        </Box>
    );
}
