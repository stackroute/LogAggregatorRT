# Complex Event Processor
> Real Time Data Analyzer & Visualizer (CEP - RT) also known as LogAggregatorRT

[Complex Event Processing](https://en.wikipedia.org/wiki/Complex_event_processing) is a Distributed, Data Intensive, Real time *complex data analysis* tool. It continuously ingests & analyses the live data from multiple sources, to derive operational intelligence to identify potential opportunities, risks and any other meaningful event. Data can be analyzed from more than one source, in relation with the other

Data analysis watch lists can be configured on the fly and analyzed, graphs are plotted and shared with other users.

## Where is it useful
This application is very useful, where time series data is intensive, flowing with high frequency, fuzzy, intelligence has to be inferred in real time as it happens, to identify assertions & patterns and risk

##### Example 1:
> By observing the credit card access pattern of a specific user and by comparing each access with his historic access pattern, flag the access as fraudulent or normal, before the transaction is complete or settled.

##### Example 2:
> On a stock price data feed, by continuously calculating the average price of a specific stock's price against the competitors stock price, we can trigger event if the price is sharply raising/dropping due unexpected event at stock's firm, which can help the trader to decide if he/she has to got long or short on the stock

For more feature details refer [Wiki](https://github.com/stackroute/LogAggregatorRT/wiki)


### Contributing
Start contributing by cloning the repository, when you are done building a features/fixing, create a pull request

1. To get started, clone the repository to your local

		git clone https://github.com/stackroute/LogAggregatorRT.git

2. Optionally, you can clone from a specific branch, we recommend to branch from `devbranch_v1`
	
		git clone https://github.com/stackroute/LogAggregatorRT.git -b devbranch_v1

3. To build, run the project, follow these below commands from inside of the project folder

		cd LogAggregatorRT

		npm install
		bower install
		npm start 

If you don't have [npm](https://docs.npmjs.com)  and [bower](http://bower.io/#install-bower) , refer to its corresponding installation 
