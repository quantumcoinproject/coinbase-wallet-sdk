import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Box,
  Code,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useCBWSDK } from '../../context/CBWSDKProvider';
import { ADDR_TO_FILL } from './shortcut/const';

export function RpcMethodCard({ connected, format, method, params, shortcuts }) {
  const [response, setResponse] = React.useState<Response | null>(null);
  const [error, setError] = React.useState<Record<string, unknown> | string | number | null>(null);
  const { provider } = useCBWSDK();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submit = useCallback(
    async (data: Record<string, string>) => {
      setError(null);
      setResponse(null);
      if (!provider) return;
      let values = data;
      if (format) {
        // fill active address to the request
        const addresses = await provider.request({ method: 'eth_accounts' });
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (data[key] === ADDR_TO_FILL) {
              data[key] = addresses[0];
            }
          }
        }
        values = format(data);
      }
      try {
        // connection required
        if (!connected) {
          await provider.enable();
        }
        const response = await provider.request({
          method,
          params: values,
        });
        setResponse(response);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          const { code, message } = err;
          setError({ code, message });
        }
      }
    },
    [provider]
  );

  return (
    <Box minWidth="500px" as="form" onSubmit={handleSubmit(submit)} >
        {params?.length > 0 && (
          <>
            <Accordion allowMultiple mt={4} defaultIndex={shortcuts ? [1] : [0]}  index={[0]}>
              <AccordionItem>
                <AccordionButton>
                  <Heading as="h3" size="sm" marginY={2} flex="1" textAlign="left">
                    Signing Details
                  </Heading>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack spacing={2} mt={2}>
                    {params.map((param) => {
                      const err = errors[param.key];
                      return (
                        <FormControl key={param.key} isInvalid={!!err} isRequired={param.required}>
                          <InputGroup size="lg">
                            <InputLeftAddon>{param.key}</InputLeftAddon>
                            <Input size='lg'
                              {...register(param.key, {
                                required: param.required ? `${param.key} required` : false,
                              })}
                            />
                          </InputGroup>
                          <FormErrorMessage>{err?.message as string}</FormErrorMessage>
                        </FormControl>
                      );
                    })}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        )}
         <Flex align="center" justify="space-between">
          <Button type="submit" mt={4}>
            Submit
          </Button>
        </Flex>
        {response && (
          <VStack mt={4}>
            <Heading as="h4" size="sm" marginY={2} flex="1" textAlign="left">
              Signature
            </Heading>
            <Code as="pre" p={4} wordBreak="break-word" whiteSpace="pre-wrap" w="100%"  colorScheme="green">
              {JSON.stringify(response, null, 2)}
            </Code>
          </VStack>
        )}
        {error && (
          <VStack mt={4}>
            <Code
              as="pre"
              colorScheme="red"
              p={4}
              wordBreak="break-word"
              whiteSpace="pre-wrap"
              w="100%"
            >
              {JSON.stringify(error, null, 2)}
            </Code>
          </VStack>
        )}
    </Box>
  );
}
