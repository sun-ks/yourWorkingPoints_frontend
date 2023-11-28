if (typeof clearImmediate === 'undefined') {
    global.clearImmediate = (immediateId) => {
      return clearTimeout(immediateId);
    };
  }


