import datetime, urllib3
from http import HTTPStatus
import random
import string
from locust import HttpUser, TaskSet, task, constant

# This test can be run after installing locust through the cli as "locust --host=http://<deployed_host>:<port>"
# Then url http://localhost:8089/ should be access to start the test.
# Can also be run using no UI mode as "locust --no-web -c <number_of_clients> -r <clients_per_second> --run-time <time e.g. 1h30m> --host=http://<deployed_host>:<port>"

jwt_token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyNiIsIm5hbWUiOiJJbnRlZ3JhdGlvbiBUZXN0IFVzZXIiLCJlbWFpbCI6InVzZXJAaW50ZWdyYXRpb250ZXN0LmNvbSJ9.qP2b-YoBlahtXdlrnLJsq_um1fsWl56nrS5XHPafcD8'


class DefaultTaskSet(HttpUser):

    wait_time = constant(1)

    def on_start(self):
        headers = {'Authorization': jwt_token}
        name = ''.join(random.choice(string.ascii_lowercase) for i in range(10))
        user = {
            "name": name,
            "email": name + "@citest.com"
        }
        # CREATE USER
        r_create = self.client.post(
            "/users", headers=headers, data=user)
        assert r_create.status_code == HTTPStatus.CREATED, "Unexpected response code: " + \
            str(r_create.status_code)

        # SAVE CREATED USER ID
        global user_id
        user_id=str(r_create.json()['id'])
        
        # UPDATE USER
        r_update = self.client.put(
            "/users/"+user_id, headers=headers, data=user)
        assert r_update.status_code == HTTPStatus.CREATED, "Unexpected response code: " + \
            str(r_update.status_code)

    def on_stop(self):
         headers = {'Authorization': jwt_token}
         r = self.client.delete(
            "/testusers", headers=headers)

    @task(1)
    def get_users(self):
        headers = {'Authorization': jwt_token}
        r = self.client.get(
            "/users", headers=headers)
        assert r.status_code == HTTPStatus.OK, "Unexpected response code: " + \
            str(r.status_code)

    @task(10)
    def get_user(self):
        headers = {'Authorization': jwt_token}
        r = self.client.get(
            "/users/"+user_id, headers=headers)
        assert r.status_code == HTTPStatus.OK, "Unexpected response code: " + \
            str(r.status_code)
