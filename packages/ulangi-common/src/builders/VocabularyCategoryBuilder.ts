/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { DeepPartial } from '@ulangi/extended-types';
import * as _ from 'lodash';
import * as moment from 'moment';

import { VocabularyCategory } from '../interfaces/general/VocabularyCategory';

export class VocabularyCategoryBuilder {
  public build(
    vocabularyCategory: DeepPartial<VocabularyCategory>
  ): VocabularyCategory {
    return _.merge(
      {
        categoryName: '',
        updatedAt: moment.utc().toDate(),
        createdAt: moment.utc().toDate(),
        firstSyncedAt: null,
        lastSyncedAt: null,
      },
      vocabularyCategory
    );
  }
}
