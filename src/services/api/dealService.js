export const dealService = {
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "assignee_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        orderBy: [{"fieldName": "CreatedOn", "sorttype": "DESC"}]
      };

      const response = await apperClient.fetchRecords('deal_c', params);
      
      if (!response.success) {
        console.error("Error fetching deals:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching deals:", error?.response?.data?.message || error);
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
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "assignee_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('deal_c', parseInt(id), params);
      
      if (!response.success) {
        console.error(`Error fetching deal ${id}:`, response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching deal ${id}:`, error?.response?.data?.message || error);
      return null;
    }
  },

  async create(dealData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: dealData.title_c,
          title_c: dealData.title_c,
          assignee_c: dealData.assignee_c,
          value_c: dealData.value_c,
          stage_c: dealData.stage_c,
          probability_c: dealData.probability_c,
          expected_close_date_c: dealData.expected_close_date_c,
          contact_id_c: parseInt(dealData.contact_id_c)
        }]
      };

      const response = await apperClient.createRecord('deal_c', params);
      
      if (!response.success) {
        console.error("Error creating deal:", response.message);
        throw new Error(response.message);
      }

      return response.results?.[0]?.data;
    } catch (error) {
      console.error("Error creating deal:", error?.response?.data?.message || error);
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
          Name: updateData.title_c || updateData.Name,
          title_c: updateData.title_c,
          assignee_c: updateData.assignee_c,
          value_c: updateData.value_c,
          stage_c: updateData.stage_c,
          probability_c: updateData.probability_c,
          expected_close_date_c: updateData.expected_close_date_c,
          contact_id_c: updateData.contact_id_c ? parseInt(updateData.contact_id_c) : undefined
        }]
      };

      const response = await apperClient.updateRecord('deal_c', params);
      
      if (!response.success) {
        console.error("Error updating deal:", response.message);
        throw new Error(response.message);
      }

      return response.results?.[0]?.data;
    } catch (error) {
      console.error("Error updating deal:", error?.response?.data?.message || error);
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

      const response = await apperClient.deleteRecord('deal_c', params);
      
      if (!response.success) {
        console.error("Error deleting deal:", response.message);
        return false;
      }

      return response.results?.[0]?.success || false;
    } catch (error) {
      console.error("Error deleting deal:", error?.response?.data?.message || error);
      return false;
    }
  },

  async getByStage(stage) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "assignee_c"}},
          {"field": {"Name": "value_c"}},
          {"field": {"Name": "stage_c"}},
          {"field": {"Name": "probability_c"}},
          {"field": {"Name": "expected_close_date_c"}},
          {"field": {"Name": "contact_id_c"}},
          {"field": {"Name": "CreatedOn"}}
        ],
        where: [{"FieldName": "stage_c", "Operator": "ExactMatch", "Values": [stage]}]
      };

      const response = await apperClient.fetchRecords('deal_c', params);
      
      if (!response.success) {
        console.error("Error fetching deals by stage:", response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching deals by stage:", error?.response?.data?.message || error);
      return [];
    }
  }
};