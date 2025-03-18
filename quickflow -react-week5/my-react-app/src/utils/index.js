export const counter = (() => {
    // Get count from localStorage or default to 0
    let count = parseInt(localStorage.getItem("selectedCounter")) || 0;
  
    const updateStorage = () => {
      localStorage.setItem("selectedCounter", count);
    };
  
    return {
      increase: () => {
        count++;
        updateStorage();
        return count;
      },
      decrease: () => {
        if (count > 0) count--;
        updateStorage();
        return count;
      },
      reset: () => {
        count = 0;
        updateStorage();
        return count;
      },
      getCount: () => count,
      setCount: (newCount) => {
        count = newCount;
        updateStorage();
        return count;
      }
    };
  })();