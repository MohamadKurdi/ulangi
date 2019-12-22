import { ErrorCode } from '@ulangi/ulangi-common/enums';
import Axios from 'axios';
import * as querystring from 'query-string';

import { resolveEnv } from '../utils/resolveEnv';
import { signUpRandomly } from '../utils/signUpRandomly';

describe('API endpoint /translate', (): void => {
  const env = resolveEnv();
  describe('Tests start after signing up and access token is retrieved', (): void => {
    let accessToken;
    beforeEach(
      async (): Promise<void> => {
        const response = await signUpRandomly();
        accessToken = response.data.accessToken;
      }
    );

    it('should return translations when translate with google successfully with access token', async (): Promise<
      void
    > => {
      const response = await Axios.get(
        env.API_URL +
          '/translate?' +
          querystring.stringify({
            sourceText: 'dog',
            sourceLanguageCode: 'en',
            translatedToLanguageCode: 'zh',
            translator: 'google',
          }),
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        }
      );

      expect(response.data.translations.length > 0).toBe(true);
    });

    it('should return UNSUPPORTED_TRANSLATOR when translator is not supported', async (): Promise<
      void
    > => {
      await expect(
        Axios.get(
          env.API_URL +
            '/translate?' +
            querystring.stringify({
              sourceText: 'dog',
              sourceLanguageCode: 'en',
              translatedToLanguageCode: 'zh',
              translator: 'any',
            }),
          {
            headers: { Authorization: 'Bearer ' + accessToken },
          }
        )
      ).rejects.toMatchObject({
        response: {
          status: 400,
          data: { errorCode: ErrorCode.TRANSLATION__UNSUPPORTED_TRANSLATOR },
        },
      });
    });
  });

  it('cannot translate if acccess token is not provided', async (): Promise<
    void
  > => {
    await expect(
      Axios.get(env.API_URL + '/translate')
    ).rejects.toMatchObject({
      response: {
        status: 401,
        data: 'Unauthorized',
      },
    });
  });
});
