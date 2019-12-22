/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { AbstractResolver } from '@ulangi/resolver';
import * as Joi from 'joi';

import { SetExtraDataName } from '../../enums/SetExtraDataName';
import { QuizMultipleChoiceMaxLimit } from '../../interfaces/general/QuizMultipleChoiceMaxLimit';

export class QuizMultipleChoiceMaxLimitResolver extends AbstractResolver<
  QuizMultipleChoiceMaxLimit
> {
  protected rules = {
    dataName: Joi.string().valid(
      SetExtraDataName.QUIZ_MULTIPLE_CHOICE_MAX_LIMIT
    ),
    dataValue: Joi.number(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    firstSyncedAt: Joi.date().allow(null),
    lastSyncedAt: Joi.date().allow(null),
  };
}
