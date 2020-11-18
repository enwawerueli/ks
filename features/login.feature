Feature: User authentication

    User should be able to signup and login into the system with their credentials

    Scenario: User wants to signup
        Given The user is on the signup page
        When User fills in their details: "<fullname>", "<username>", "<email>", "<password>", "<phoneno>" and clicks `Save and Continue`
        And User fills in additional details: "<company>", "<id_passport>", "<company_regno>", "<regno>", "<email>" and clicks `Submit`
        Then Login is successful and user lands on their dashbard

        Examples:
            | fullname  | username | email              | password | phoneno    | company            | id_passport | company_regno | regno |
            | Joe Woods | jwoods   | jwoods@sasalog.com | 123456   | 0790122041 | Build Construction | 0287479     | 298757        | P958  |

    Scenario: User wants to login
        Given The user is on the login page
        When User inputs correct "<username>" plus "<password>" and clicks `SignIn`
        Then Login is successful and user lands on their dashbard

        Examples:
            | username | password |
            | elixa    | 123456   |