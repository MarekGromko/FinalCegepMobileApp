import * as Flex from "./common/flex";
import * as Font from "./common/font";
import { padding } from "./common/padding";
import { margin } from "./common/margin";

export const CS = { 
    Flex, 
    Font, 
    padding, 
    margin 
} as const;

export type CS = typeof CS;

