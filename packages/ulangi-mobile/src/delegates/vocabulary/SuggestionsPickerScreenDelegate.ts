/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { boundClass } from 'autobind-decorator';
import { Linking } from 'react-native';

import { NavigatorDelegate } from '../navigator/NavigatorDelegate';
import { SuggestionListDelegate } from '../vocabulary/SuggestionListDelegate';

@boundClass
export class SuggestionsPickerScreenDelegate {
  private suggestionListDelegate: SuggestionListDelegate;
  private navigatorDelegate: NavigatorDelegate;
  private updateVocabularyText: (vocabularyText: string) => void;

  public constructor(
    suggestionListDelegate: SuggestionListDelegate,
    navigatorDelegate: NavigatorDelegate,
    updateVocabularyText: (vocabularyText: string) => void,
  ) {
    this.suggestionListDelegate = suggestionListDelegate;
    this.navigatorDelegate = navigatorDelegate;
    this.updateVocabularyText = updateVocabularyText;
  }

  public getSuggestions(): void {
    this.suggestionListDelegate.getSuggestions(this.updateVocabularyText);
  }

  public clearSuggestions(): void {
    this.suggestionListDelegate.clearSuggestions();
  }

  public openLink(link: string): void {
    Linking.openURL(link).catch(
      (err): void => console.error('An error occurred', err),
    );
  }

  public close(): void {
    this.navigatorDelegate.dismissLightBox();
  }
}