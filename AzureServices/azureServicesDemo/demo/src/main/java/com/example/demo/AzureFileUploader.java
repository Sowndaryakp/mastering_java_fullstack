package com.example.demo;

import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.security.keyvault.secrets.SecretClient;
import com.azure.security.keyvault.secrets.SecretClientBuilder;
import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import com.microsoft.applicationinsights.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

public class AzureFileUploader {

    public static void main(String[] args) {
        // 1. Azure Connection String (or use SAS URL instead)
        String connectionString = "enter key";
        String connectionStringAI1 = "enter key";

        // 2. Container name in Azure Blob Storage
        String containerName = "blob1";
        String appInsightsName = "appins1";

        // Connect to Key Vault
//        String keyVaultUrl = "eneter";
//
//        SecretClient secretClient = new SecretClientBuilder()
//                .vaultUrl(keyVaultUrl)
//                .credential(new DefaultAzureCredentialBuilder().build())
//                .buildClient();
//
//        // Fetch connection strings
//        String blobConnectionString = secretClient.getSecret("BlobStorageConnectionString").getValue();
//        String appInsightsConnString = secretClient.getSecret("AppInsightsConnectionString").getValue();
//
//        System.out.println("Blob Connection String: " + blobConnectionString);
//        System.out.println("App Insights Connection String: " + appInsightsConnString);

        // Use them like:
        // BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(blobConnectionString).buildClient();
        // TelemetryConfiguration configuration = TelemetryConfiguration.getActive();
        // configuration.setConnectionString(appInsightsConnString);

        // 3. File to upload (any type)
        String localFilePath = "C:/Users/Admin/Desktop/sql1.txt"; // or image.jpg, csv, etc.
        File file = new File(localFilePath);
        String blobName = file.getName(); // Use same name in blob



        try {
            // 4. Create BlobServiceClient from connection string
            BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
                    .connectionString(connectionString)
                    .buildClient();

            TelemetryConfiguration configuration = TelemetryConfiguration.getActive();
            configuration.setConnectionString(connectionStringAI1); // or connection string

            TelemetryClient telemetryClient = new TelemetryClient(configuration);

            //custom Event
            telemetryClient.trackEvent("Upload Started");

            // Track page view like a user visiting the dashboard
            telemetryClient.trackPageView("UserDashboard");

            telemetryClient.trackTrace("Function: processTransaction started");

            System.out.println("PageView: UserDashboard tracked.");

            // 5. Get Container client
            BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

            // 6. Get Blob client
            BlobClient blobClient = containerClient.getBlobClient(blobName);

            // 7. Upload the file
            blobClient.upload(new FileInputStream(file), file.length(), true);

            System.out.println("✅ File uploaded successfully to Azure Blob Storage: " + blobName);

            telemetryClient.trackMetric("Logs comming", 120.5);


        } catch (IOException e) {
            e.printStackTrace();
//            telemetryClient.trackException(e);
        }


        System.out.println("Telemetry sent to Application Insights.");
    }
}

