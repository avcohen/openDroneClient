**[Dronemappr](http://avcohen.github.io/openDroneClient/index.html)**
================================================

Dronemappr is a React based client utilizing Flux architecture to visualize, filter, and map drone strike data.

Data is provided by the [Dronemappr API](https://github.com/avcohen/openDrone).

## Usage

### SSL Requirements

**!!! Important !!!**

The [Dronemappr API](https://github.com/avcohen/openDrone) is live and hosted at [https://104.236.214.92:8443/api/v1/](https://104.236.214.92:8443/api/v1).

_Please note the SSL certificate is self signed, you'll need to accept it prior to being able to access data!_
_Simply go to the HTTPS link above, and accept the certificate, you'll then be able to use the client._

Dronemappr uses the [Google Maps JS API](https://developers.google.com/maps/documentation/javascript/). While a Google Maps API key is provided by default for ease of use, _please_ strictly limit the use of this key and replace it if you intend to utilize this software.

## Thanks

Special thanks to [Taq Karim](https://github.com/mottaquikarim) and Kirk Zamieroski for their continued support, input and all around savagely good vibes.


## License

Copyright (c) 2017 Aaron Cohen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
