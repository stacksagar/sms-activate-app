class RequestError extends Error {
  responseCode: string;
  errorCodes: any = {
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

  constructor(errorCode: string) {
    super();
    this.responseCode = errorCode;
    this.message = this.errorCodes[errorCode];
  }

  getErrorCode() {
    return this.responseCode;
  }
}

class ErrorCodes extends RequestError {
  constructor(errorCode: string) {
    super(errorCode);
  }

  checkExist(errorCode: string) {
    return this.errorCodes.hasOwnProperty(errorCode);
  }
}

class SMSActivate {
  url: string;
  apiKey: string;

  constructor(apiKey: string) {
    this.url = "https://api.sms-activate.org/stubs/handler_api.php";
    this.apiKey = apiKey;
  }

  async getNumbersStatus(country?: any, operator?: any) {
    const data: any = {
      api_key: this.apiKey,
      action: "getNumbersStatus",
    };

    if (country) {
      data["country"] = country;
    }

    if (operator && (country == 0 || country == 1 || country == 2)) {
      data["operator"] = operator;
    }

    const response = [];
    const changeKeys = await this.request(data, "GET", true);

    for (let services of changeKeys) {
      services = services.trim("_01");
      response[services] = changeKeys[services];
    }

    return response;
  }

  getTopCountriesByService(service?: string, freePrice?: boolean) {
    const data: any = {
      api_key: this.apiKey,
      action: "getTopCountriesByService",
      freePrice,
    };

    service && (data.service = service);

    return this.request(data, "POST", true);
  }

  getBalance() {
    const data = {
      api_key: this.apiKey,
      action: "getBalance",
    };
    return this.request(data, "GET");
  }

  getBalanceAndCashBack() {
    const data = {
      api_key: this.apiKey,
      action: "getBalance",
    };
    return this.request(data, "GET");
  }

  getOperators(country?: string) {
    const data: any = {
      api_key: this.apiKey,
      action: "getOperators",
    };
    country && (data.country = country);
    return this.request(data, "GET", true);
  }

  getActiveActivations() {
    const data: any = {
      api_key: this.apiKey,
      action: "getActiveActivations",
    };
    return this.request(data, "GET", true);
  }

  getNumber(
    service: string,
    forward: any,
    country?: string | number,
    operator?: string,
    ref?: string,
    phoneException?: any,
    maxPrice?: any,
    verification?: any
  ) {
    const data: any = {
      api_key: this.apiKey,
      action: "getNumber",
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

    if (phoneException) {
      data["phoneException"] = phoneException;
    }
    if (maxPrice) {
      data["maxPrice"] = maxPrice;
    }
    if (verification) {
      data["verification"] = verification;
    }

    return this.request(data, "POST", true);
  }

  getNumberV2(
    service: string,
    forward: any,
    country?: string | number,
    operator?: string,
    ref?: any,
    phoneException?: any,
    maxPrice?: any,
    verification?: any
  ) {
    const data: any = {
      api_key: this.apiKey,
      action: "getNumberV2",
      service: service,
      forward: forward,
    };
    if (operator && (country == 0 || country == 1 || country == 2)) {
      data["operator"] = operator;
    }
    if (ref) {
      data["ref"] = ref;
    }

    if (country) {
      data["country"] = country;
    }

    if (phoneException) {
      data["phoneException"] = phoneException;
    }
    if (maxPrice) {
      data["maxPrice"] = maxPrice;
    }
    if (verification) {
      data["verification"] = verification;
    }

    return this.request(data, "POST", true);
  }

  getMultiServiceNumber(
    services: any,
    forward: string | number,
    country: string | number,
    operator: any,
    ref: any
  ) {
    const data: any = {
      api_key: this.apiKey,
      action: "getMultiServiceNumber",
      multiService: services,
      multiForward: forward,
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

  setStatus(id: string, status: string, forward?: string) {
    const data: any = {
      api_key: this.apiKey,
      action: "setStatus",
      id,
      status,
    };

    if (forward) {
      data["forward"] = forward;
    }

    return this.request(data, "POST", false, 3);
  }

  getStatus(id: string) {
    const data = {
      api_key: this.apiKey,
      action: "getStatus",
      id: id,
    };
    return this.request(data, "GET", false, 2);
  }

  getHistory(start?: any, end?: any) {
    const data: any = {
      api_key: this.apiKey,
      action: "getHistory",
    };

    start && (data.start = start);
    end && (data.end = end);

    return this.request(data, "GET", false, 2);
  }

  getIncomingCallStatus(activationId: string) {
    const data: any = {
      api_key: this.apiKey,
      action: "getIncomingCallStatus",
      activationId,
    };

    return this.request(data, "GET", true);
  }

  getPrices(country?: any, service?: any) {
    const data: any = {
      api_key: this.apiKey,
      action: "getPrices",
    };

    if (country !== null) {
      data["country"] = country;
    }
    if (service) {
      data["service"] = service;
    }
    return this.request(data, "GET", true);
  }

  getPricesVerification(service?: any) {
    const data: any = {
      api_key: this.apiKey,
      action: "getPricesVerification",
    };
    if (service) {
      data["service"] = service;
    }
    return this.request(data, "GET", true);
  }

  getCountries() {
    const data = {
      api_key: this.apiKey,
      action: "getCountries",
    };
    return this.request(data, "GET", true);
  }

  getAdditionalService(service: any, activationId: any) {
    const data = {
      api_key: this.apiKey,
      action: "getAdditionalService",
      service: service,
      id: activationId,
    };
    return this.request(data, "GET", false, 1);
  }

  getExtraActivation(activationId: any) {
    const data = {
      api_key: this.apiKey,
      action: "getExtraActivation",
      activationId,
    };
    return this.request(data, "GET", false, 1);
  }

  checkExtraActivation(activationId: any) {
    const data = {
      api_key: this.apiKey,
      action: "checkExtraActivation",
      activationId,
    };
    return this.request(data, "GET", false, 1);
  }

  createTaskForCall(activationId: any, phone: string) {
    const data = {
      api_key: this.apiKey,
      action: "createTaskForCall",
      activationId,
      phone,
    };
    return this.request(data, "GET", true);
  }

  getOutgoingCalls(date: string, activationId: any) {
    const data = {
      api_key: this.apiKey,
      action: "getOutgoingCalls",
      date,
      activationId,
    };
    return this.request(data, "GET", true);
  }

  // Rent APIs
  getRentServicesAndCountries(
    country?: string,
    operator?: string,
    time?: number
  ) {
    const data: any = {
      api_key: this.apiKey,
      action: "getRentServicesAndCountries",
    };

    time && (data.rent_time = time);
    operator && (data.operator = operator);
    country && (data.country = country);

    return this.requestRent(data, "POST", true);
  }

  getRentNumber(
    service: any,
    country: any,
    rent_time: any,
    operator: any,
    url: string
  ) {
    const data = {
      api_key: this.apiKey,
      action: "getRentNumber",
      service,
      country,
      // rent_time,
      // operator,
      url,
    };
    return this.requestRent(data, "GET", true);
  }

  getRentStatus(id: string) {
    const data = {
      api_key: this.apiKey,
      action: "getRentStatus",
      id: id,
    };

    return this.requestRent(data, "POST", true);
  }

  setRentStatus(id: any, status: any) {
    const data = {
      api_key: this.apiKey,
      action: "setRentStatus",
      id: id,
      status: status,
    };
    return this.requestRent(data, "POST", true);
  }

  getRentList() {
    const data = {
      api_key: this.apiKey,
      action: "getRentList",
    };
    return this.requestRent(data, "POST", true);
  }

  continueRentNumber(id: any, time: any) {
    const data = {
      api_key: this.apiKey,
      action: "continueRentNumber",
      id: id,
      rent_time: time,
    };
    return this.requestRent(data, "POST", true);
  }

  getContinueRentPriceNumber(id: any) {
    const data = {
      api_key: this.apiKey,
      action: "getContinueRentPriceNumber",
      id: id,
    };
    return this.requestRent(data, "POST", false);
  }

  async request(
    data: any,
    method: "GET" | "POST",
    parseAsJSON?: boolean,
    getNumber?: number
  ) {
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

  async requestRent(
    data: any,
    method: "GET" | "POST",
    parseAsJSON?: boolean,
    getNumber?: number
  ) {
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

export const smsActive = new SMSActivate("d2e9A91b4eA76de3f32Acec74d5957d0");
