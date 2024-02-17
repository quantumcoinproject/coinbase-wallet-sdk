import {
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
        <Box minH="100vh" bg="blackAlpha.100">
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
