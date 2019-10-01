# fetch-react


Featching data using React Component.


## Installation

Add dependency to your project.
```sh
npm install @react-infinity/fetch-react --save
```
    
## Quick Start

```jsx
import React from 'react';
import Fetch, {Loading, Success, Error, Initialize} from '@react-infinity/fetch-react';

const App = () => (
    <div>
        <Fetch url={'https://jsonplaceholder.typicode.com/gtgt/1'}>
            <Initialize>
                {() => (<div>"Initialize"</div>)}
            </Initialize>

            <Loading>
                {() => (<div>"Loading"</div>)}
            </Loading>

            <Success>
                {(data) => (<div>Success {JSON.stringify(data)}</div>)}
            </Success>

            <Error>
                {(data) => (<div>Error {JSON.stringify(data)}</div>)}
            </Error>

        </Fetch>
    </div>
);
```
# Author

Oussama MESSAOUDI - [@Oussama Messaoudi](https://github.com/oussamamessaoudi/)
