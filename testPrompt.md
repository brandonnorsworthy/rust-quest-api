Create tests based on the following
Ideally, each test should follow a clear and structured approach: Arrange, Act, and Assert. Start by setting up the necessary preconditions and inputs (Arrange), such as initializing objects, mocking dependencies, or preparing test data. Then, execute the functionality under test (Act), which could involve calling a function, making an API request, or triggering a specific behavior. Finally, verify the outcome (Assert) by checking the results against expected values, ensuring the function's behavior is correct under various scenarios. It's also crucial to cover a range of test cases, including happy paths (where everything works as expected), edge cases (extreme or unusual inputs), and failure scenarios (to confirm that errors are handled gracefully). Additionally, tests should be isolated, meaning each test should run independently of others, without relying on shared state or side effects

Do not lie
Do not halucinate

Be sure to include the jest import statement at the top of your test file, like describe, it, and expect.
`import { describe, expect, test } from '@jest/globals';`

The project is written in typescript all tests should be written in typescript.