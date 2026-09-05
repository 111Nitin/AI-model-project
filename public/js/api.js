/**
 * ProjectMentor AI - Client API Client
 * Manages communication with backend REST endpoints with timeouts,
 * error handling, and offline awareness.
 */

class ApiClient {
  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl;
    this.timeoutMs = 25000;
  }

  async _request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => ({
        success: false,
        error: 'Invalid JSON response from server'
      }));

      if (!response.ok) {
        const errorMsg = data.details
          ? data.details.join('; ')
          : (data.error || `HTTP error ${response.status}`);
        throw new Error(errorMsg);
      }

      return data;
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error('Request timed out. Please check your connection or try again.');
      }
      throw err;
    }
  }

  async checkHealth() {
    return this._request('/health');
  }

  async validateProfile(profile) {
    return this._request('/profile/validate', {
      method: 'POST',
      body: JSON.stringify(profile)
    });
  }

  async generateIdeas(profile) {
    return this._request('/ideas/generate', {
      method: 'POST',
      body: JSON.stringify(profile)
    });
  }

  async compareIdeas(ideas, profile) {
    return this._request('/ideas/compare', {
      method: 'POST',
      body: JSON.stringify({ ideas, profile })
    });
  }

  async generateBlueprint(idea, profile) {
    return this._request('/blueprint/generate', {
      method: 'POST',
      body: JSON.stringify({ idea, profile })
    });
  }

  async analyzeSkills(profile, project) {
    return this._request('/skills/analyze', {
      method: 'POST',
      body: JSON.stringify({ profile, project })
    });
  }

  async generateRoadmap(project, profile) {
    return this._request('/roadmap/generate', {
      method: 'POST',
      body: JSON.stringify({ project, profile })
    });
  }

  async performRealityCheck(projectData) {
    return this._request('/reality-check', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
  }

  async recommendImprovements(improveData) {
    return this._request('/improve', {
      method: 'POST',
      body: JSON.stringify(improveData)
    });
  }
}

// Attach to window
window.apiClient = new ApiClient();
