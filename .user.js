// ==UserScript==
// @name         Lead Deletion Tracker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Track lead deletions in Salesmate
// @match        https://*.salesmate.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Listen for requests from the server
    window.addEventListener('message', function(event) {
        if (event.origin !== 'http://yourserver.com') return;
        }
    );

    // Function to track lead deletions
    function trackLeadDeletion(leadId, userId) {
    // Retrieve existing lead deletion count from local storage
    const existingLeadDeletionCount = parseInt(localStorage.getItem(`lead_deletion_count_${userId}`)) || 0;
    // Increment the count for this user
    const newLeadDeletionCount = existingLeadDeletionCount + 1;
    // Save the updated count back to local storage
    localStorage.setItem(`lead_deletion_count_${userId}`, newLeadDeletionCount);
    // Optionally, you can also store individual lead IDs for further analysis
    // Retrieve existing lead IDs from local storage
    const existingLeadIds = JSON.parse(localStorage.getItem(`lead_ids_${userId}`)) || [];
    // Add the new lead ID to the list
    existingLeadIds.push(leadId);
    // Save the updated list back to local storage
    localStorage.setItem(`lead_ids_${userId}`, JSON.stringify(existingLeadIds));
}

    // Add onclick event listener to lead delete buttons
    document.querySelectorAll('.delete-lead-button').forEach(function(button) {
        button.addEventListener('click', function(event) {
            const leadId = event.target.dataset.leadId;
            const userId = 'user123'; // Replace with actual user ID
            trackLeadDeletion(leadId, userId);
        });
    });

})();
