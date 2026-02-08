/**
 * @file fakerCustom.ts
 * @description Faker 自定义生成器
 *
 * 本文件提供自定义的数据生成方法。
 * 扩展 Faker.js 的功能，生成特定格式的测试数据。
 *
 * @module /Users/zhangzhiming/code/antares/src/common/libs/fakerCustom
 */
import { faker } from '@faker-js/faker';
import * as moment from 'moment';

export const fakerCustom = {
   seed: faker.seed,
   setLocale: faker.setLocale,
   ...faker,
   date: {
      now: () => moment().format('YYYY-MM-DD HH:mm:ss'),
      ...faker.date
   },
   time: {
      now: () => moment().format('HH:mm:ss'),
      random: () => moment(faker.date.recent()).format('HH:mm:ss'),
      ...faker.time
   }
};
