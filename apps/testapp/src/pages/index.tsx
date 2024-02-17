import { Box, Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import React from 'react';

import { WIDTH_2XL } from '../components/Layout';
import { RpcRequestInput } from '../components/RpcMethods/method/RpcRequestInput';
import { signMessageMethods } from '../components/RpcMethods/method/signMessageMethods';
import { RpcMethodCard } from '../components/RpcMethods/RpcMethodCard';
import { ShortcutType } from '../components/RpcMethods/shortcut/ShortcutType';
import { signMessageShortcutsMap } from '../components/RpcMethods/shortcut/signMessageShortcuts';

export default function Home() {
  return (
    <Container maxW={WIDTH_2XL} mb={8}>
      <MethodsSection
        title="Sign Message For Getting Coins From Tokens"
        methods={signMessageMethods}
        shortcutsMap={signMessageShortcutsMap}
      />
    </Container>
  );
}

function MethodsSection({
  title,
  methods,
  shortcutsMap,
}: {
  title: string;
  methods: RpcRequestInput[];
  shortcutsMap?: Record<string, ShortcutType[]>;
}) {
  return (
    <Box mt={4}>
      <Heading size="md">{title}</Heading>
      <Grid
        mt={2}
        templateColumns={{ base: '100%', md: 'repeat(2, 50%)', xl: 'repeat(3, 33%)' }}
        gap={2}
      >
        {methods.map((rpc) => (
          <GridItem w="100%" key={rpc.method}>
            <RpcMethodCard
              method={rpc.method}
              params={rpc.params}
              connected={rpc.connected}
              format={rpc.format}
              shortcuts={shortcutsMap?.[rpc.method]}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
