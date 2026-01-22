# Make multistage data plant

## The plan

Write a short and concise plan in the md file. The plan is: I want the current backend scripts to work  in a multi stage procces: first extract to raw text in the '01-raw` data folder (this is already the case), then parse the raw text to JSON in the '02-json` data folder (this is already the case) 

Then in the '03-type` I want to determin the type of procces each json file sould go through. exasmples: get all the riddles and all the solutions and connect them. 
then in the '04-process` I want to process each json file according to the type determined in the '03-type` folder.

then in the '05-review` I want to review the processed json files and make sure they are correct. 
after the review in the '06-store` I want to store the json files in the database.