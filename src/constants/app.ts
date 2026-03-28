/**
 * Application-wide constants
 * Centralizes magic numbers and strings used throughout the application
 */

export const APP_CONSTANTS = {
  /**
   * Riddle-related constants
   */
  RIDDLES: {
    /**
     * Number of attempts to find a different random riddle before falling back
     * Used in Home.tsx when picking the next random riddle
     */
    RANDOM_SELECTION_ATTEMPTS: 8,
  },

  /**
   * LocalStorage keys used throughout the application
   */
  STORAGE_KEYS: {
    /**
     * Key for storing reading progress across all books
     */
    READING_TRACKER: 'riddles_reading_tracker',

    /**
     * Key for storing whether tracking is enabled per book
     */
    TRACKING_STATE: 'riddles_tracking_enabled',

    /**
     * Prefix for individual riddle completion status
     * Actual key format: 'riddle_done_{riddleId}'
     */
    RIDDLE_DONE_PREFIX: 'riddle_done_',
  },
} as const;
