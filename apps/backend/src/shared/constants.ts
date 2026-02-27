/* eslint-disable no-restricted-syntax */
export const enum Role {
  ADMIN = 'admin',
  DEFAULT = 'default',
}

export const enum ValidationMessage {
  INVALID_EMAIL_FORMAT = 'Некорректный формат email',
  EMAIL_REQUIRED = 'Email обязателен для заполнения',

  PASSWORD_MUST_BE_STRING = 'Пароль должен быть строкой',
  PASSWORD_LENGTH = 'Пароль должен содержать от 8 до 16 символов',
  PASSWORD_REQUIRED = 'Пароль обязателен для заполнения',

  FIRST_NAME_MUST_BE_STRING = 'Имя должно быть строкой',
  FIRST_NAME_LENGTH = 'Имя должно содержать от 2 до 50 символов',

  LAST_NAME_MUST_BE_STRING = 'Фамилия должна быть строкой',
  LAST_NAME_LENGTH = 'Фамилия должна содержать от 2 до 50 символов',

  WORK_PHONE_MUST_BE_STRING = 'Рабочий телефон должен быть строкой',

  PERSONAL_PHONES_MUST_BE_ARRAY = 'Персональные телефоны должны быть массивом',
  PERSONAL_PHONE_MUST_BE_STRING = 'Каждый персональный телефон должен быть строкой',

  DEPARTMENT_MUST_BE_STRING = 'Департамент должен быть строкой',
  GRADE_MUST_BE_STRING = 'Грейд должен быть строкой',
  OFFICE_ADDRESS_MUST_BE_STRING = 'Адрес офиса должен быть строкой',

  BIRTHDAY_MUST_BE_DATE = 'Дата рождения должна быть в формате даты (ISO 8601)',

  ABOUT_MUST_BE_STRING = 'Поле "О себе" должно быть строкой',

  NEW_PASSWORD_MUST_BE_STRING = 'Новый пароль должен быть строкой',
  NEW_PASSWORD_LENGTH = 'Новый пароль должен содержать от 8 до 16 символов',

  OLD_PASSWORD_MUST_BE_STRING = 'Старый пароль должен быть строкой',
  OLD_PASSWORD_LENGTH = 'Старый пароль должен содержать от 8 до 16 символов',

  SEARCH_MUST_BE_STRING = 'Поисковая строка должна быть строкой',

  TARGET_USER_ID_MUST_BE_INT = 'Идентификатор пользователя должен быть целым числом',
  TARGET_USER_ID_MUST_BE_POSITIVE = 'Идентификатор пользователя должен быть положительным числом',

  REQUEST_STATUS_MUST_BE_STRING = 'Статус запроса должен быть строкой',

  ACCESS_REQUEST_STATUS_INVALID = 'Некорректный статус заявки на доступ',
}
