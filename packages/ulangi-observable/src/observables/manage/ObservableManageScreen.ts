/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  ManageListType,
  ScreenName,
  VocabularyFilterType,
} from '@ulangi/ulangi-common/enums';
import { IObservableValue, observable } from 'mobx';

import { ObservableCategoryListState } from '../category/ObservableCategoryListState';
import { ObservableScreen } from '../screen/ObservableScreen';
import { ObservableTouchableTopBar } from '../top-bar/ObservableTouchableTopBar';
import { ObservableVocabularyListState } from '../vocabulary/ObservableVocabularyListState';

export class ObservableManageScreen extends ObservableScreen {
  @observable
  public screenAppearedTimes: number;

  public readonly manageListType: IObservableValue<ManageListType>;

  public readonly selectedFilterType: IObservableValue<VocabularyFilterType>;

  public readonly vocabularyListState: ObservableVocabularyListState;

  public readonly categoryListState: ObservableCategoryListState;

  public constructor(
    screenAppearedTimes: number,
    manageListType: IObservableValue<ManageListType>,
    selectedFilterType: IObservableValue<VocabularyFilterType>,
    vocabularyListState: ObservableVocabularyListState,
    categoryListState: ObservableCategoryListState,
    componentId: string,
    screenName: ScreenName,
    topBar: ObservableTouchableTopBar
  ) {
    super(componentId, screenName, topBar);
    this.screenAppearedTimes = screenAppearedTimes;
    this.manageListType = manageListType;
    this.selectedFilterType = selectedFilterType;
    this.vocabularyListState = vocabularyListState;
    this.categoryListState = categoryListState;
  }
}
