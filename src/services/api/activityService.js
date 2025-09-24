export const activityService = {
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
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('activity_c', params);
      
      if (!response.success) {
        console.error("Error fetching activities:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching activities:", error?.response?.data?.message || error);
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
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('activity_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(`Error fetching activity ${id}:`, response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching activity ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(activityData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${activityData.type_c} - ${activityData.description_c.substring(0, 50)}...`,
          type_c: activityData.type_c,
          description_c: activityData.description_c,
          contact_id_c: parseInt(activityData.contact_id_c),
          deal_id_c: activityData.deal_id_c ? parseInt(activityData.deal_id_c) : null
        }]
      };

      const response = await apperClient.createRecord('activity_c', params);
      
      if (!response.success) {
        console.error("Error creating activity:", response.message);
        throw new Error(response.message);
      }

      return response.results?.[0]?.data;
    } catch (error) {
      console.error("Error creating activity:", error?.response?.data?.message || error);
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
          Name: `${updateData.type_c} - ${updateData.description_c.substring(0, 50)}...`,
          type_c: updateData.type_c,
          description_c: updateData.description_c,
          contact_id_c: parseInt(updateData.contact_id_c),
          deal_id_c: updateData.deal_id_c ? parseInt(updateData.deal_id_c) : null
        }]
      };

      const response = await apperClient.updateRecord('activity_c', params);
      
      if (!response.success) {
        console.error("Error updating activity:", response.message);
        throw new Error(response.message);
      }

      return response.results?.[0]?.data;
    } catch (error) {
      console.error("Error updating activity:", error?.response?.data?.message || error);
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

      const response = await apperClient.deleteRecord('activity_c', params);
      
      if (!response.success) {
        console.error("Error deleting activity:", response.message);
        return false;
      }

      return response.results?.[0]?.success || false;
    } catch (error) {
      console.error("Error deleting activity:", error?.response?.data?.message || error);
      return false;
    }
  },

  async getByContact(contactId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "deal_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "contact_id_c", "Operator": "ExactMatch", "Values": [parseInt(contactId)]}],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('activity_c', params);
      
      if (!response.success) {
        console.error("Error fetching activities by contact:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching activities by contact:", error?.response?.data?.message || error);
      return [];
    }
  }
};