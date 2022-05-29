'use strict';

const {actionWithObjectAfterCheck: actionType} = require('@ecosystem/enums/object');

const firstCaseCottagesSell = (params, userId, api) => {
  const {
    cadastrLand,
    phone
  } = params;

  /*
    Совпадение по кадастровому номеру земли? - ДА
    Совпадение по номеру телефона? - ДА
  */
  return api().service('search.getObjects')
    .body({
      filter: {
        userId,
        'cottages.cadastrLand': [cadastrLand],
        'clientContacts.phone': [phone]
      }
    });
};

const resultFirstCase = async(doubles, objectId, ticketId, api) => {
  const objectNotYetExist = !objectId;

  if (objectNotYetExist) {
    return {
      actionType: actionType.OBJECT_DO_NOT_CREATE
    };
  }

  if (doubles.some((double) => double !== objectId)) {
    await api()
      .service('tickets.deleteTickets')
      .body([ticketId]);

    return {
      actionType: actionType.OBJECT_GO_TO_ARCHIVE
    };
  }
};

module.exports = {
  firstCaseCottagesSell,
  resultFirstCase
};
