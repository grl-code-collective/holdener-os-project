import React from 'react';
import './BinaryTree.css';

const TreeNode = ({ label, children }) => {
  return (
    <div className="tree-node">
      <div className="node-label">{label}</div>
      {children && <div className="node-children">{children}</div>}
    </div>
  );
};

const Tree = () => {
  return (
    <div className="tree">
      <TreeNode label="1">
        <TreeNode label="2">
          <TreeNode label="4">
            <TreeNode label="8" />
            <TreeNode label="9" />
          </TreeNode>
          <TreeNode label="5">
            <TreeNode label="10" />
            <TreeNode label="11" />
          </TreeNode>
        </TreeNode>
        <TreeNode label="3">
          <TreeNode label="6">
            <TreeNode label="13" />
          </TreeNode>
          <TreeNode label="7">
            <TreeNode label="14" />
          </TreeNode>
        </TreeNode>
      </TreeNode>
    </div>
  );
};

export default Tree;

