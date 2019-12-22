/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Options } from '@ulangi/react-native-navigation';
import { ScreenName, Theme } from '@ulangi/ulangi-common/enums';
import { ObservableQuizSettingsScreen } from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Container, ContainerPassedProps } from '../../Container';
import { QuizSettingsScreenIds } from '../../constants/ids/QuizSettingsScreenIds';
import { QuizSettingsScreenFactory } from '../../factories/quiz/QuizSettingsScreenFactory';
import { QuizSettingsScreen } from './QuizSettingsScreen';
import { QuizSettingsScreenStyle } from './QuizSettingsScreenContainer.style';

@observer
export class QuizSettingsScreenContainer extends Container {
  public static options(props: ContainerPassedProps): Options {
    return props.theme === Theme.LIGHT
      ? QuizSettingsScreenStyle.SCREEN_FULL_LIGHT_STYLES
      : QuizSettingsScreenStyle.SCREEN_FULL_DARK_STYLES;
  }

  private quizSettingsScreenFactory = new QuizSettingsScreenFactory(
    this.props,
    this.eventBus,
    this.observer
  );

  private quizSettingsDelegate = this.quizSettingsScreenFactory.createQuizSettingsDelegate();

  private originalSettings = this.quizSettingsDelegate.getCurrentSettings();

  protected observableScreen = new ObservableQuizSettingsScreen(
    this.originalSettings.vocabularyPool,
    this.originalSettings.multipleChoiceQuizLimit,
    this.originalSettings.writingQuizLimit,
    ScreenName.QUIZ_SETTINGS_SCREEN
  );

  private navigatorDelegate = this.quizSettingsScreenFactory.createNavigatorDelegate();

  private screenDelegate = this.quizSettingsScreenFactory.createScreenDelegate(
    this.observableScreen
  );

  public navigationButtonPressed({ buttonId }: { buttonId: string }): void {
    if (buttonId === QuizSettingsScreenIds.BACK_BTN) {
      this.navigatorDelegate.pop();
    } else if (buttonId === QuizSettingsScreenIds.SAVE_BTN) {
      this.screenDelegate.save();
    }
  }

  protected onThemeChanged(theme: Theme): void {
    this.navigatorDelegate.mergeOptions(
      theme === Theme.LIGHT
        ? QuizSettingsScreenStyle.SCREEN_LIGHT_STYLES_ONLY
        : QuizSettingsScreenStyle.SCREEN_DARK_STYLES_ONLY
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <QuizSettingsScreen
        darkModeStore={this.props.rootStore.darkModeStore}
        observableScreen={this.observableScreen}
        screenDelegate={this.screenDelegate}
      />
    );
  }
}
