# Monday Pope Tech Sync

## Overview

Monday Pope Tech Sync is a powerful integration application that enhances your Monday boards by providing real-time URL status checks and web accessibility statistics from Pope Tech. With seamless integration, this application simplifies your workflow and improves the quality of your online content. Monday Pope Tech Sync is designed to streamline your project management process. The retrieved data is then automatically populated into your Monday board.

This is the "Quickstart Integration" Monday app.
<br>It can be used as a board recipe, which transforms data from one text column to another

<br>This app demonstrates how to use the:

- integration recipe
- custom action

<br>You can find more info in our QuickStart guide [here](https://monday.com/developers/apps/quickstart-integration/)
<br>![Screenshot](https://dapulse-res.cloudinary.com/image/upload/v1658942490/remote_mondaycom_static/developers/screenshots/QUICKSTART_GIPHY.gif)

## Tech Stack Used

- **AWS Lambda**: We employ AWS Lambda functions to efficiently check the status of URLs and retrieve statistics from Pope Tech.
- **Node.js Backend**: Our Node.js backend serves as the bridge between the AWS Lambda functions, allowing you to connect this application to any 
- **Monday board with the app installed**.
- **Dockerized Node.js Backend**: The Node.js backend is containerized and deployed on AWS EC2 instances, managed by NGINX for optimal performance.

## Workflow

1. **Install the Monday Pope Tech Sync Application** from the Monday App Marketplace.

2. **Configure Your Monday Board Columns**:

   Ensure your Monday board has the following columns to make the most of this application:

   - **Redirect**: Use this column to track URL redirection.
   - **New URL**: Record new URLs that need to be checked.
   - **Check PopeTech**: This column is crucial for triggering the integration.
   - **Errors**: Track any errors or issues.
   - **Pages**: Record the number of pages on the website.
   - **Errors per Page**: Monitor the ratio of errors to pages.
   - **Full URL**: Store the complete website URL.
     
![Screenshot 2023-10-24 at 3 23 37 PM](https://github.com/usu-access/Monday-Pope-Tech-Sync/assets/41461773/4e2bbad4-98eb-48de-be61-3a6e5161a97d)
![Screenshot 2023-10-24 at 3 23 23 PM](https://github.com/usu-access/Monday-Pope-Tech-Sync/assets/41461773/d239f511-1b28-4fc7-be1e-fdfe1ff154fd)
![Screenshot 2023-10-24 at 3 23 07 PM](https://github.com/usu-access/Monday-Pope-Tech-Sync/assets/41461773/4e4c10d2-2218-4530-b3d4-ecd5a0087fff)

3. **Configure the Integration**:

   - **Redirect Column Status**:
     Configure the "Check Redirect" status to trigger URL status checks.
     
![Screenshot 2023-10-24 at 3 24 11 PM](https://github.com/usu-access/Monday-Pope-Tech-Sync/assets/41461773/8488f113-f077-408f-a842-ba463dccfdd7)

   - **Check PopeTech Column Status**:
     Configure the "Check" status to initiate data retrieval from Pope Tech.
     
![Screenshot 2023-10-24 at 3 24 28 PM](https://github.com/usu-access/Monday-Pope-Tech-Sync/assets/41461773/bd07021f-348e-460a-92c0-38c45c6a46c4)

4. **Automated Actions**:

   - When the **Redirect Column** changes to "Check Redirect," the application automatically checks the status of the Full URL and updates the status accordingly.

   - When the **Check PopeTech Column** changes to "Check," the application retrieves web accessibility statistics from Pope Tech and populates your Monday board.

![Screenshot 2023-10-24 at 3 24 48 PM](https://github.com/usu-access/Monday-Pope-Tech-Sync/assets/41461773/b506660e-a644-457a-8fe1-67f5823e307b)

Monday Pope Tech Sync empowers you to maintain the accessibility and functionality of your online content with ease and efficiency.

## Getting Started

To get started with Monday Pope Tech Sync, follow the steps below:

1. Install the application from the Monday App Marketplace.

2. Configure your Monday board with the specified columns as described above.

3. Set up the integration by configuring the column statuses as described above.

For detailed installation and configuration instructions, please refer to our [official documentation](link-to-documentation).

## Contribution

We welcome contributions from the community to enhance and improve Monday Pope Tech Sync. Please check our [Contribution Guidelines](link-to-contribution-guidelines) for more information on how to get involved.

## License

Monday Pope Tech Sync is licensed under the [MIT License](link-to-license).

Feel free to use the above content for your GitHub README. Be sure to replace the placeholder links with actual links to your documentation, contribution guidelines, and license information. This README will help users understand the purpose and usage of your Monday Pope Tech Sync application and guide them through the setup process.
