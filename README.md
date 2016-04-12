# LogAggregatorRT
Complex Event Processing (aka CEP) using Log Aggregation from multiple sources of data in Real Time

### What is CEP
[CEP](https://en.wikipedia.org/wiki/Complex_event_processing) is building a Data Intensive (intesive data rate), Real Time data analysis application, which processes data from multiple sources to infer events or patterns, to identify meaningful intelligence or risk and respond to them as quickly as possible.

Data can be aggregated over period of time or in a specific time window and events can be generated, using which we can infer a inttelligence

Eg: 
	On a stock price data feed, by contineously calculating the average price of a specific stock's price, we can trigger event if the price is sharply raising/dropping, which can help the trader to think if he/she has to buy or sell the stock

Simillarly, by detecting a pattern in events, decisions can be made on behalf of user to automatically manage a situation

Eg: 
	By observing the credit card access pattern of a specific user and by comparing each access with previous access pattern (historic data), we can decide if the access is normal or fishy


### How will this help business
- Using such real time data anlyais, system can provide solutions for [*"Operational intelligence"*](https://en.wikipedia.org/wiki/Operational_intelligence), using which business process can be optimised, greater risk can be averted or have adquate time to handle the situation

- Help business analyse and find root cause of a problem(regular pattern) almost in real time (reduce to minutes instead of hours or days)

### Functional features, which have to be built 
1. Provide support for multi-tenancy - multiple customers logging to same app, but each of them getting access to only the data they have subscribed to and having access to, as well ensuring change in subscribed data of one customer is not impacting the other customers.

2. Process (aggregate) live data stream to analyse for detecting events and patterns, over a specific time window and against historic data 

3. Implement watchlist definition & saving, execution, displaying 

4. Implement Authoring of streams & theire metadata, dimensions & measures

5. Implement management console to monitor

6. Implement customer dashboard to display operational intelligence and other useful information, which they can share with other user/customers

7. Processing of streams in distributed way for auto scaling with dynamic provisioning of prociessing nodes 

8. //TBD & manay more coming as clarity improves


### How will you demonstrate the app
1. Configure (define & save) a data source & streams for an organisation using management console
2. Display intelligence information as graphs and other artifacts on a dashboard
3. Configure a time window and instantly start showing analysis of the time windows against historic data and slide the time windows 

	Eg: configure analysis for a specific pattenr in time window T1 (T0 to T10), at end of T10, show the analysis results automatically or in real time and create a new time window T2 (for same T0 to T10 frequency)
4. //TBD & will elaborate as clarity improves
