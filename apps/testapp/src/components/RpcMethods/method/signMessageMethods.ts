import {
 recoverPersonalSignature, 
} from '@metamask/eth-sig-util';

import { RpcRequestInput } from './RpcRequestInput';

const personalSign: RpcRequestInput = {
  method: 'personal_sign',
  params: [
    { key: 'message', required: true },
  ],
  format: (data: Record<string, string>) => [
    `0x${Buffer.from(data.message, 'utf8').toString('hex')}`,
    data.address,
  ],
};

export const signMessageMethods = [
 personalSign,
];

export const verifySignMsg = ({
  method,
  from,
  sign,
  message,
}: {
  method: string;
  from: string;
  sign: string;
  message: unknown;
}) => {
  switch (method) {
    case 'personal_sign': {
      const msg = `0x${Buffer.from(message as string, 'utf8').toString('hex')}`;
      const recoveredAddr = recoverPersonalSignature({
        data: msg,
        signature: sign,
      });
      if (recoveredAddr === from) {
        return `SigUtil Successfully verified signer as ${recoveredAddr}`;
      } else {
        return `SigUtil Failed to verify signer when comparing ${recoveredAddr} to ${from}`;
      }
    }
    default:
      return null;
  }
};
