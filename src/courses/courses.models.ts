import {
  isArrayContainsOnlyString,
  isNumber,
  isString,
} from '@helpers/common.helpers';

export class Course implements CourseModelWithRequiredState {
  title: ValueWithRequiredState<string>;
  description: ValueWithRequiredState<string>;
  creationDate: ValueWithRequiredState<string>;
  duration: ValueWithRequiredState<number>;
  authors: ValueWithRequiredState<string[]>;

  constructor({
    title = null,
    description = null,
    creationDate = null,
    duration = null,
    authors = null,
  }: CourseModel) {
    this.title = {
      value: title,
      required: true,
      isValid: title && isString(title),
      type: 'string',
    };
    this.description = {
      value: description,
      required: true,
      isValid: description && isString(description),
      type: 'string',
    };
    this.creationDate = {
      value: creationDate,
      required: true,
      isValid: creationDate && isString(creationDate),
      type: 'string',
    };
    this.duration = {
      value: duration,
      required: true,
      isValid: duration && isNumber(duration),
      type: 'number',
    };
    this.authors = {
      value: authors,
      required: true,
      isValid: authors && authors.length && isArrayContainsOnlyString(authors),
      type: 'string[]',
    };
  }

  get errorStates(): string[] {
    return Object.keys(this).reduce((acc: string[], key: string) => {
      const classProperty = this[key] as ValueWithRequiredState<any>;

      if (classProperty.required && !classProperty.value) {
        return [...acc, `'${key}' was missed.`];
      }

      if (!classProperty.isValid) {
        return [...acc, `'${key}' should be a ${classProperty.type}`];
      }

      return acc;
    }, [] as string[]);
  }
}

interface CourseModelWithRequiredState {
  title: ValueWithRequiredState<string>;
  description: ValueWithRequiredState<string>;
  creationDate: ValueWithRequiredState<string>;
  duration: ValueWithRequiredState<number>;
  authors: ValueWithRequiredState<string[]>;
}

export interface ValueWithRequiredState<T> {
  value: T;
  required: boolean;
  isValid: boolean;
  type: string;
}

export interface CourseModel {
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
  id: string;
}
