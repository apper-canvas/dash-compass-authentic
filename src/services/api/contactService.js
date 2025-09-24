export const contactService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "last_activity_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('contact_c', params);
      
      if (!response.success) {
        console.error("Error fetching contacts:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching contacts:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "last_activity_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('contact_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(`Error fetching contact ${id}:`, response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(contactData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${contactData.first_name_c} ${contactData.last_name_c}`,
          first_name_c: contactData.first_name_c,
          last_name_c: contactData.last_name_c,
          email_c: contactData.email_c,
          phone_c: contactData.phone_c,
          company_c: contactData.company_c,
          status_c: contactData.status_c,
          last_activity_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('contact_c', params);
      
      if (!response.success) {
        console.error("Error creating contact:", response.message);
        throw new Error(response.message);
      }

      return response.results?.[0]?.data;
    } catch (error) {
      console.error("Error creating contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: `${updateData.first_name_c} ${updateData.last_name_c}`,
          first_name_c: updateData.first_name_c,
          last_name_c: updateData.last_name_c,
          email_c: updateData.email_c,
          phone_c: updateData.phone_c,
          company_c: updateData.company_c,
          status_c: updateData.status_c,
          last_activity_c: new Date().toISOString()
        }]
      };

      const response = await apperClient.updateRecord('contact_c', params);
      
      if (!response.success) {
        console.error("Error updating contact:", response.message);
        throw new Error(response.message);
      }

      return response.results?.[0]?.data;
    } catch (error) {
      console.error("Error updating contact:", error?.response?.data?.message || error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('contact_c', params);
      
      if (!response.success) {
        console.error("Error deleting contact:", response.message);
        return false;
      }

      return response.results?.[0]?.success || false;
    } catch (error) {
      console.error("Error deleting contact:", error?.response?.data?.message || error);
      return false;
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "last_activity_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        whereGroups: [{
          operator: "OR",
          subGroups: [
            {
              conditions: [
                {"fieldName": "first_name_c", "operator": "Contains", "values": [query]},
                {"fieldName": "last_name_c", "operator": "Contains", "values": [query]},
                {"fieldName": "email_c", "operator": "Contains", "values": [query]},
                {"fieldName": "company_c", "operator": "Contains", "values": [query]}
              ],
              operator: "OR"
            }
          ]
        }]
      };

      const response = await apperClient.fetchRecords('contact_c', params);
      
      if (!response.success) {
        console.error("Error searching contacts:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error searching contacts:", error?.response?.data?.message || error);
      return [];
    }
  }
};