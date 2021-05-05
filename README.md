This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

### Approaches
- Redux Toolkit
Redux Toolkit is official recommended approach for writing Redux Logic according to [Redux documentation](https://redux.js.org/introduction/getting-started#redux-toolkit).

- Object Oriented Programming
Defined types and classes as its implementation and turned the API response to objects so that it can be handled by objects, rather than just using static typing.

- Case conversion
API response uses snake_case which is commonly used for most backend languages, and it is best practice to use camelCase in frontend.
To keep consistency, I did case conversion while mapping the response into objects

- Advanced Table component
Rather than making a static component, I made a customizable table components which will show table depends on the data and columns given.
Inside columns, we have 3 basic options but we can add more if we need.
  - caption: This is string for header
  - getter: function to get actual value, I would use `string | function` type which is the key or getter function, but for now, I just stick to a getter function
  - formatter: function to format value, if this is not given, it will display the raw data returned by getter function

- Selection
It just clears all selection when we move to another pages, or change the page size, etc.
We may bring a better user experience at later.

- Pagination
When we change the page size, it calculates the new page number which will show the first record on its page.
