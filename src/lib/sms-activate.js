class RequestError extends Error {
  constructor(errorCode) {
    super();
    this.responseCode = errorCode;
    this.message = this.errorCodes[errorCode];
  }

  errorCodes = {
    ACCESS_ACTIVATION: "Сервис успешно активирован",
    ACCESS_CANCEL: "активация отменена",
    ACCESS_READY: "Ожидание нового смс",
    ACCESS_RETRY_GET: "Готовность номера подтверждена",
    ACCOUNT_INACTIVE: "Свободных номеров нет",
    ALREADY_FINISH: "Аренда уже завершена",
    ALREADY_CANCEL: "Аренда уже отменена",
    BAD_ACTION: "Некорректное действие (параметр action)",
    BAD_SERVICE: "Некорректное наименование сервиса (параметр service)",
    BAD_KEY: "Неверный API ключ доступа",
    BAD_STATUS: "Попытка установить несуществующий статус",
    BANNED: "Аккаунт заблокирован",
    CANT_CANCEL: "Невозможно отменить аренду (прошло более 20 мин.)",
    ERROR_SQL: "Один из параметров имеет недопустимое значение",
    NO_NUMBERS: "Нет свободных номеров для приёма смс от текущего сервиса",
    NO_BALANCE: "Закончился баланс",
    NO_YULA_MAIL:
      "Необходимо иметь на счету более 500 рублей для покупки сервисов холдинга Mail.ru и Mamba",
    NO_CONNECTION: "Нет соединения с серверами sms-activate",
    NO_ID_RENT: "Не указан id аренды",
    NO_ACTIVATION: "Указанного id активации не существует",
    STATUS_CANCEL: "Активация/аренда отменена",
    STATUS_FINISH: "Аренда оплачена и завершена",
    STATUS_WAIT_CODE: "Ожидание первой смс",
    STATUS_WAIT_RETRY: "ожидание уточнения кода",
    SQL_ERROR: "Один из параметров имеет недопустимое значение",
    INVALID_PHONE: "Номер арендован не вами (неправильный id аренды)",
    INCORECT_STATUS: "Отсутствует или неправильно указан статус",
    WRONG_SERVICE: "Сервис не поддерживает переадресацию",
    WRONG_SECURITY:
      "Ошибка при попытке передать ID активации без переадресации, или же завершенной/не активной активации",
  };

  getErrorCode() {
    return this.responseCode;
  }
}

class ErrorCodes extends RequestError {
  constructor(errorCode) {
    super(errorCode);
  }

  checkExist(errorCode) {
    return errorCodes.hasOwnProperty(errorCode);
  }
}

class SMSActivate {
  constructor(apiKey) {
    this.url = "https://api.sms-activate.org/stubs/handler_api.php";
    this.apiKey = apiKey;
  }

  getBalance() {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
    };
    return this.request(data, "GET");
  }

  getBalanceAndCashBack() {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
    };
    return this.request(data, "GET");
  }

  getTopCountriesByService(service = "", freePrice = false) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      service: service,
      $freePrice: freePrice,
    };
    return this.request(data, "POST", true);
  }

  getNumbersStatus(country = null, operator = null) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
    };

    if (country) {
      data["country"] = country;
    }

    if (operator && (country == 0 || country == 1 || country == 2)) {
      data["service"] = operator;
    }

    const response = [];
    const changeKeys = this.request(data, "GET", true);

    for (const services of changeKeys) {
      services = services.trim("_01");
      response[services] = changeKeys[services];
    }

    return response;
  }

  getNumber(service, country = null, forward = 0, operator = null, ref = null) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      service: service,
      forward: forward,
    };
    if (country) {
      data["country"] = country;
    }
    if (operator && (country == 0 || country == 1 || country == 2)) {
      data["operator"] = operator;
    }
    if (ref) {
      data["ref"] = ref;
    }
    return this.request(data, "POST", null, 1);
  }

  getMultiServiceNumber(
    services,
    forward = 0,
    country = null,
    operator = null,
    ref = null
  ) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      multiService: services,
      forward: forward,
    };
    if (country) {
      data["country"] = country;
    }
    if (operator && (country == 0 || country == 1 || country == 2)) {
      data["operator"] = operator;
    }
    if (ref) {
      data["ref"] = ref;
    }
    return this.request(data, "POST", true, 1);
  }

  setStatus(id, status, forward = 0) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      id: id,
      status: status,
    };
    if (forward) {
      data["forward"] = forward;
    }
    return this.request(data, "POST", null, 3);
  }

  getStatus(id) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      id: id,
    };
    return this.request(data, "GET", false, 2);
  }

  getCountries() {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
    };
    return this.request(data, "GET", true);
  }

  getAdditionalService(service, activationId) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      service: service,
      id: activationId,
    };
    return this.request(data, "GET", false, 1);
  }

  getFullSms(id) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      id: id,
    };
    return this.request(data, "GET");
  }

  getPrices(country = null, service = null) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
    };
    if (country !== null) {
      data["country"] = country;
    }
    if (service) {
      data["service"] = service;
    }
    return this.request(data, "GET", true);
  }

  getRentServicesAndCountries(time = 4, operator = "any") {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      rent_time: time,
      operator: operator,
    };
    return this.requestRent(data, "POST", true);
  }

  getRentNumber(service, time = 4, country = 0, operator = "any", url = "") {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      service: service,
      rent_time: time,
      operator: operator,
      country: country,
      url: url,
    };
    return this.requestRent(data, "POST", true);
  }

  getRentStatus(id) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      id: id,
    };
    return this.requestRent(data, "POST", true);
  }

  setRentStatus(id, status) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      id: id,
      status: status,
    };
    return this.requestRent(data, "POST", true);
  }

  getRentList() {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
    };
    return this.requestRent(data, "POST", true);
  }

  continueRentNumber(id, time = 4) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      id: id,
      rent_time: time,
    };
    return this.requestRent(data, "POST", true);
  }

  getContinueRentPriceNumber(id, time) {
    const data = {
      api_key: this.apiKey,
      action: __FUNCTION__,
      id: id,
      rent_time: time,
    };
    return this.requestRent(data, "POST", false);
  }

  async request(data, method, parseAsJSON = null, getNumber = null) {
    method = method.toUpperCase();

    if (!["GET", "POST"].includes(method)) {
      throw new Error("Method can only be GET or POST");
    }

    const serializedData = new URLSearchParams(data).toString();
    let response;

    if (method === "GET") {
      const requestUrl = `${this.url}?${serializedData}`;
      response = await fetch(requestUrl);
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: serializedData,
      };
      response = await fetch(this.url, requestOptions);
    }

    const result = await response.text();

    const responseError = new ErrorCodes(result);
    const check = responseError.checkExist(result);

    try {
      if (check) {
        throw new RequestError(result);
      }
    } catch (error) {
      return error.getResponseCode();
    }

    if (parseAsJSON) {
      return JSON.parse(result);
    }

    const parsedResponse = result.split(":");

    if (getNumber === 1) {
      return { id: parsedResponse[1], number: parsedResponse[2] };
    }
    if (getNumber === 2) {
      return { status: parsedResponse[0], code: parsedResponse[1] };
    }
    if (getNumber === 3) {
      return { status: parsedResponse[0] };
    }
    return parsedResponse[1];
  }

  async requestRent(data, method, parseAsJSON = null, getNumber = null) {
    method = method.toUpperCase();

    if (!["GET", "POST"].includes(method)) {
      throw new Error("Method can only be GET or POST");
    }

    const serializedData = new URLSearchParams(data).toString();
    let response;

    if (method === "GET") {
      const requestUrl = `${this.url}?${serializedData}`;
      response = await fetch(requestUrl);
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: serializedData,
      };
      response = await fetch(this.url, requestOptions);
    }

    const result = await response.text();

    if (parseAsJSON) {
      const parsedResult = JSON.parse(result);
      // Uncomment the following lines if you want to handle potential errors
      // const responseError = new ErrorCodes(parsedResult["message"]);
      // const check = responseError.checkExist(parsedResult["message"]);
      // if (check) {
      //     throw new RequestError(parsedResult["message"]);
      // }
      return parsedResult;
    }

    return result;
  }
}
