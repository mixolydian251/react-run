// returns filtered and sorted data

export default (customers, { text }) => {
  return customers
    .filter(customer => {
      const name = `${customer.firstName} ${customer.lastName}`;
      return (
        typeof text !== 'string' ||
        name.toLowerCase().includes(text.toLowerCase())
      );
    })
    .sort();
};
