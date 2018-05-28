import { OnlyLengthMinMax, OnlyLength } from './only-length-str/';
import { IsValidDomain } from './is-valid-domain/';
import { NotThisWords } from './not-this/';
import { OnlyLatin } from './only-latin/';

export class MyValidators {
  public static onlyLength = OnlyLength;
  public static onlyLengthMinMax = OnlyLengthMinMax;
  public static notThisWords = NotThisWords;
  public static isValidDomain = IsValidDomain;
}
