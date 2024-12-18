class BinaryHeap:
  def __init__(self, score_function, type, head=None):
    self.content = []
    self.score_function = score_function
    self.type = type
    if head != None:
      self.push(head)

  # Add a new element to the heap
  def push(self, element):
    self.content.append(element)
    self.bubble_up(len(self.content) - 1)

  # Remove the primary node of the heap
  def pop(self):
    # This is what we want to return later
    result = self.content[0]
    # Grab the last element of the list
    end = self.content.pop()
    # If it wasn't the only element in the array, add it to the top and sink it down
    if len(self.content) > 0:
      self.content[0] = end
      self.sink_down(0)
    return result

  # Remove an arbitrary node of the heap
  def remove(self, element):
    length = len(self.content)
    for i in range(length):
      if self.content[i] != element:
        pass
      # When it's found, we need to pop the last element into its place and
      # bubble it up or sink it down (unless it was the last element)
      end = self.content.pop()
      if i == length - 1:
        break
      self.content[i] = end
      self.bubble_up(i)
      self.sink_down(i)
      break

  def size(self):
    return len(self.content)

  def bubble_up(self, n):
    # Fetch and score the target element
    element = self.content[n]
    score = self.score_function(element)
    # Can't bubble higher than zero
    while n > 0:
      # Fetch the parent element
      parent_n = int((n + 1) / 2) - 1
      parent = self.content[parent_n]
      parent_score = self.score_function(parent)
      # If these two are correct, we're good
      if (self.type == "min" and score >= parent_score) or (self.type == "max" and score <= parent_score):
        break
      # Otherwise, we should swap them and continue
      self.content[n] = parent
      self.content[parent_n] = element
      n = parent_n

  def sink_down(self, n):
    length = len(self.content)
    # Fetch and score the target element
    element = self.content[n]
    score = self.score_function(element)
    while True:
      # Get the child indices
      child_2_n = (n + 1) * 2
      child_1_n = child_2_n - 1
      # Store possible new position of element
      swap = None
      # If the first child exists, fetch it and score it
      child_1 = self.content[child_1_n] if child_1_n < length else None
      child_1_score = self.score_function(child_1) if child_1 != None else None
      # Compare them and swap if necessary
      if child_1_score != None and ((self.type == "min" and child_1_score < score) or (self.type == "max" and child_1_score > score)):
        swap = child_1_n
      # Check child 2 as well
      if child_2_n < length:
        child_2 = self.content[child_2_n]
        child_2_score = self.score_function(child_2)
        if (self.type == "min" and child_2_score < score) or (self.type == "max" and child_2_score > score):
          if self.type == "min":
            # We should swap with either the lesser (min) or greater (max) or its children
            swap = child_1_n if child_1_score < child_2_score else child_2_n
        if self.type == "max":
          swap = child_1_n if child_1_score > child_2_score else child_2_n
      # If we don't need to swap, we're done
      if swap == None:
        break
      # Otherwise, swap and continue
      self.content[n] = self.content[swap]
      self.content[swap] = element
      n = swap
