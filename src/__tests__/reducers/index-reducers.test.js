import rootReducer from '../../reducers/index';

describe("rootReducer", () => {

  test('Should return default state if no action is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      masterticketList: {},
      formVisibleOnPage: false
    });
  });
});