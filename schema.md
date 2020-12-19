# Users

<table role="table">
  <thead>
    <tr>
      <th>column name</th>
      <th>data type</th>
      <th>details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>integer serial</td>
      <td>not null, primary key</td>
    </tr>
      <tr>
        <td><code>username</code></td>
        <td>string</td>
        <td>not null, unique</td>
      </tr>
      <tr>
        <td><code>email</code></td>
        <td>string</td>
        <td>not null, unique</td>
      </tr>
      <tr>
        <td><code>hashedPassword</code></td>
        <td>bytea</td>
        <td>not null</td>
      </tr>
      <tr>
        <td><code>createdAt</code></td>
        <td>datetime</td>
        <td>not null</td>
      </tr>
      <tr>
        <td><code>updatedAt</code></td>
        <td>datetime</td>
        <td>not null</td>
      </tr>
  </tbody>
</table>
<br />

- <code>Users</code> has many <code>Items</code>

<br />

# Items

<table role="table">
  <thead>
    <tr>
      <th>column name</th>
      <th>data type</th>
      <th>details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>integer serial</td>
      <td>not null, primary key</td>
    </tr>
      <tr>
        <td><code>itemName</code></td>
        <td>string</td>
        <td>not null</td>
      </tr>
      <tr>
        <td><code>description</code></td>
        <td>string</td>
        <td>not null</td>
      </tr>
      <tr>
        <td><code>price</code></td>
        <td>float</td>
        <td>(null means free)</td>
      </tr>
      <tr>
        <td><code>sellerId</code></td>
        <td>integer</td>
        <td>not null</td>
      </tr>
      <tr>
        <td><code>buyerId</code></td>
        <td>integer</td>
        <td>(null means not sold)</td>
      </tr>
      <tr>
        <td><code>createdAt</code></td>
        <td>datetime</td>
        <td>not null</td>
      </tr>
      <tr>
        <td><code>updatedAt</code></td>
        <td>datetime</td>
        <td>not null</td>
      </tr>
  </tbody>
</table>
<br />

- <code>sellerId</code> references <code>User</code>
- <code>buyerId</code> references <code>User</code>

<br />
