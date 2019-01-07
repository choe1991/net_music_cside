/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  player: {
    id: `${scope}.player`,
    defaultMessage: '我要播放',
  },
  pick: {
    id: `${scope}.pick`,
    defaultMessage: '我要点歌',
  },
});
