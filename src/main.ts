import parser from "./parser"
import { handler } from "./handler";

/*
 * Pass command line arguments to the parser and construct an 
 * OptionMap that specifies what options have been enabled by 
 * the user and any arguments.
 */ 
const optMap = parser(process.argv);

handler(optMap);
