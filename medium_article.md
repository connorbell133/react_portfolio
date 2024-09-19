











Robust LLM\-Driven SQL Query Generation
 with Substrate.run
===========================================================











![]()




In this notebook, I will build a robust `Natural-Language to SQL` Process using [Substrates](https://substrate.run) `ComputeJSON()` feature.


This will generate Syntactically \+ Contextually Correct Queries by
 manually building out:


* Mappings of the SQL Table you are querying
* NLP Style SQL Objects that you will put together to create an SQL
 Syntax for the Large Language Model to reference.


To use this Script all you need is a substrate.run account \+ api key
 `($50 in free credits on sign up)`



please reach to [connor bell](http://connorbell.dev) for any
 questions or suggestions or email me [here](mailto:connor.m.bell13@gmail.com).


SQL Table
---------








![]()




Setting Environment
===================


First, I set up my development environment by installing the necessary
 Python packages.


I made sure that the required libraries, such as ‘Pydantic’ and
 ‘Substrate’, were correctly installed to avoid any issues during the development
 process.



```
!pip install pydantic  
!pip install substrate  
from substrate import ComputeJSON, Substrate  
from pydantic import BaseModel, Field, validator  
from typing import Optional, Union, List  
  
key = "apik_XXXXXXXXXXXXXX"  
substrate = Substrate(api_key=key)
```

Step 1: Defining Column Types \+ Enumerations
=============================================


To start, I defined enumerations for **dept\_id** and **expertise**.
 This step was crucial as it allowed me to restrict the possible values for these
 fields, ensuring that only valid options are used in SQL queries.



```
from enum import Enum  
  
class Departments(str, Enum):  
    IT = "IT"  
    SALES = "SALES"  
    ACCOUNTING = "ACCOUNTING"  
    CEO = "CEO"  
  
class EmpLevel(str, Enum):  
    JUNIOR = "JUNIOR"  
    SEMISENIOR = "SEMISENIOR"  
    SENIOR = "SENIOR"  
  
class column_names(str, Enum):  
    EMPLOYEE_ID = "employee_id"  
    FIRST_NAME = "first_name"  
    LAST_NAME = "last_name"  
    DEPT_ID = "dept_id"  
    MANAGER_ID = "manager_id"  
    SALARY = "salary"  
    EXPERTISE = "expertise"  
      
class TableColumns(BaseModel):  
    employee_id: Optional[int] = Field(None, title="Employee ID", description="The ID of the employee")  
    first_name: Optional[str] = Field(None, title="First Name", description="The first name of the employee")  
    last_name: Optional[str] = Field(None, title="Last Name", description="The last name of the employee")  
    dept_id: Optional[Departments] = Field(None, title="Department ID", description="The department ID of the employee")  
    manager_id: Optional[int] = Field(None, title="Manager ID", description="The ID of the manager")  
    salary: Optional[int] = Field(None, title="Salary", description="The salary of the employee")  
    expertise: Optional[EmpLevel] = Field(None, title="Expertise Level", description="The expertise level of the employee")
```

Step 2: Defining SQL Syntax through Models
==========================================


I defined models to describe SQL `operations`, `comparisons`, `logic operators`, and `ordering`.



> This approach ensures that SQL queries adhere to the correct
>  format and data types, Allowing [Substrate](http://substrate.run) to have access
>  to the base SQL Language when generating the JSON



```
class sql_type(str, Enum):  
    SELECT = "SELECT"  
    INSERT = "INSERT"  
    UPDATE = "UPDATE"  
    DELETE = "DELETE"  
  
class sql_compare(str, Enum):  
    EQUAL = "="  
    NOT_EQUAL = "!="  
    GREATER = ">"  
    LESS = "<"  
    GREATER_EQUAL = ">="  
    LESS_EQUAL = "<="  
  
class sql_logic_operator(str, Enum):  
    AND = "AND"  
    OR = "OR"  
  
class sql_order(str, Enum):  
    ASC = "ASC"  
    DESC = "DESC"
```

Step 4: Combining SQL Conditions with Logic Operators
=====================================================


With the enumerations and validation models in place, I moved on to
 constructing SQL queries.


I developed a function to dynamically build SQL queries based on the
 validated data from models. This method offers several key benefits:


* `Security:` By leveraging
 predefined enumerations and data validations, the approach helps prevent
 errors and vulnerabilities in the queries.
* `Accuracy:` The function
 ensures that the generated SQL queries are correctly formatted and adhere to
 the expected criteria.


In essence, this step integrates the validated data into
 well\-structured SQL queries, combining conditions and logic operators
 effectively.



```
from pydantic import BaseModel, Field, validator  
from typing import Union  
  
class sql_comparison(BaseModel):  
    column: column_names = Field(..., title="Table Column", description="Column in the Table")  
    compare: sql_compare = Field(..., title="Comparison Operator", description="Comparison Operator")  
    value: Union[str, Departments, EmpLevel] = Field(..., title="Value", description="Value to Compare")  
      
class sql_logic_condition(BaseModel):  
    logic: sql_logic_operator = Field(..., title="Logic Operator", description="Logic Operator")  
    comparison: sql_comparison = Field(..., title="Comparison", description="Comparison")  
  
class SQLQuery(BaseModel):  
    sql: sql_type = Field(..., title="SQL Type", description="SQL Type")  
    columns: list[column_names] = Field(..., title="Columns", description="Columns to Select")  
    table: str = Field(..., title="Table", description="Table Name")  
    conditions: List[sql_logic_condition] = Field(..., title="Conditions", description="List of Conditions with Logic")  
    order: Optional[sql_order] = Field(None, title="Order", description="Order")  
    limit: Optional[int] = Field(None, title="Limit", description="Limit")
```

Step 5: Query Substrate endpoint to create SQL JSON Structure
=============================================================


Now that our ***SQLQuery*** class has been fully built out, we are
 ready to start hitting [Substrate](http://substrate.run) through their
 **ComputeJSON**() endpoint for generation.
 


1. We first enter out question, in this case I wanted to show the
 chaining of comparison statements.
2. We then create our run shown as ***a*** where we are defining what we want
 substrate to do.
3. Then kick\-off the run by simply calling ***substrate.run(a)***
4. Wait for the completion, before getting the **json\_object**
5. Finally, we format the response as a **SQLQuery** object



```
question = "can you provide me with the the amount of employee id and salary in the Account department that has a salary greater than 50000 in descending order?"  
a = ComputeJSON(  
    prompt=question,  
    json_schema=SQLQuery.model_json_schema(),  
)  
res = substrate.run(a)  
res_json = res.get(a).json_object  
query_formatted = SQLQuery(**res_json)  
res_json
```

We now have our query!!!



```
{'sql': 'SELECT',  
 'columns': ['employee_id', 'salary'],  
 'table': 'employees',  
 'conditions': [{'logic': 'AND',  
   'comparison': {'column': 'dept_id', 'compare': '=', 'value': 'ACCOUNTING'}},  
  {'logic': 'AND',  
   'comparison': {'column': 'salary', 'compare': '>', 'value': '50000'}}],  
 'order': 'DESC',  
 'limit': None}
```

Step 6: Formatting Query Response
=================================


With the ***SQLQuery***
 object ready, we construct the SQL string by parsing and combining its
 components into the proper SQL format.



```
# Generate the initial Base Query with no comparisons  
generated_query = f"{query_formatted.sql} {', '.join([col.value for col in query_formatted.columns])} FROM {query_formatted.table}"  
  
# Check for additional conditions  
if query_formatted.conditions:  
    # Replace first logical operator with WHERE  
    generated_query += " WHERE "  
  
    # For each condition, append it the query in the correct format  
    for i, condition in enumerate(query_formatted.conditions):  
        if i > 0:  
            generated_query += f" {condition.logic} "  
        generated_query += f"{condition.comparison.column} {condition.comparison.compare} {condition.comparison.value}"  
  
# if there is an ordering rule, then format and append  
if query_formatted.order:  
    generated_query += f" ORDER BY {', '.join([col.value for col in query_formatted.columns])} {query_formatted.order}"  
  
# if there is a limit, then format and append  
if query_formatted.limit:  
    generated_query += f" LIMIT {query_formatted.limit}"  
  
  
generated_query
```

FINAL QUERY



```
SELECT employee_id, salary   
FROM employees   
WHERE dept_id = ACCOUNTING   
AND salary > 50000   
ORDER BY employee_id, salary DESC
```

Next Steps
==========


I will continue to add to this to:


* allow for azure/gcp sql exporting and auto mapping ability.
* Change Sql mapping to allow for nested Queries


Conclusion
==========


My team has encountered consistent issues with SQL generation through
 LLM’s. The primary challenge isn’t related to formatting but rather to context.
 



> Even with optimized prompt structures that include all necessary
>  rows and context, we still end up consuming excessive tokens for even the
>  simplest queries. The \`ComputeJSON()\` function does not count the
>  \`json\_schema\` as ingested tokens


Our strategy, which focuses on minimizing the context required in
 prompts, has proven to be effective. By solely including the query itself and
 eliminating external context, we have significantly reduced token usage by over
 90%.











